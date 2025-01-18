from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_caching import Cache
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from textblob import TextBlob
from transformers import pipeline
from langdetect import detect
from wordcloud import WordCloud
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import emoji
import os
import json
import datetime
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
from PyPDF2 import PdfReader
from docx import Document
import pandas as pd
from collections import defaultdict, Counter
import re

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app, resources={r"/*": {"origins": ["http://localhost:5000", "http://localhost:3000"]}})

# Configure Flask extensions
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

cache = Cache(app, config={'CACHE_TYPE': 'simple'})
jwt = JWTManager(app)

# Load emotion classifier
emotion_classifier = pipeline('text-classification', 
                            model='j-hartmann/emotion-english-distilroberta-base', 
                            return_all_scores=True)

# Load sentiment classifier
sentiment_classifier = pipeline('sentiment-analysis', 
                              model='nlptown/bert-base-multilingual-uncased-sentiment',
                              return_all_scores=True)

# Initialize storage
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

analysis_history = defaultdict(list)

def extract_text_from_file(file):
    """Extract text from various file formats"""
    if file.filename.endswith('.pdf'):
        reader = PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    elif file.filename.endswith('.docx'):
        doc = Document(file)
        return " ".join([paragraph.text for paragraph in doc.paragraphs])
    elif file.filename.endswith('.txt'):
        return file.read().decode('utf-8')
    else:
        raise ValueError("Unsupported file format")

def clean_text(text):
    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Convert to lowercase
    text = text.lower()
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    
    return tokens

def get_keywords(text, num_keywords=10):
    # Get clean tokens
    tokens = clean_text(text)
    
    # Count word frequencies
    word_freq = Counter(tokens)
    
    # Get most common words
    keywords = [word for word, _ in word_freq.most_common(num_keywords)]
    
    return keywords

def generate_word_cloud(text):
    """Generate word cloud image"""
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(text)
    img = io.BytesIO()
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.savefig(img, format='png')
    plt.close()
    img.seek(0)
    return base64.b64encode(img.getvalue()).decode()

def analyze_sentiment(text):
    """Enhanced sentiment analysis"""
    # Basic sentiment analysis
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    subjectivity = analysis.sentiment.subjectivity
    
    # Get detailed sentiment scores
    sentiment_scores = sentiment_classifier(text)[0]
    sentiment_dict = {
        'positive': sum(score['score'] for score in sentiment_scores if score['label'] in ['5 stars', '4 stars']),
        'neutral': sum(score['score'] for score in sentiment_scores if score['label'] in ['3 stars']),
        'negative': sum(score['score'] for score in sentiment_scores if score['label'] in ['1 star', '2 stars'])
    }
    
    # Normalize sentiment scores
    total = sum(sentiment_dict.values())
    sentiment_dict = {k: v/total for k, v in sentiment_dict.items()}
    
    # Determine sentiment category
    if polarity > 0:
        sentiment = "positive"
    elif polarity < 0:
        sentiment = "negative"
    else:
        sentiment = "neutral"
    
    # Emotion analysis
    emotions = emotion_classifier(text)[0]
    
    # Language detection
    try:
        language = detect(text)
    except:
        language = "unknown"
    
    # Keyword extraction
    keywords = get_keywords(text)
    
    # Generate word cloud
    wordcloud_image = generate_word_cloud(text) if len(text.split()) > 3 else None
    
    # Emoji analysis
    emoji_count = defaultdict(int)
    for char in text:
        if char in emoji.EMOJI_DATA:
            emoji_count[char] += 1
    
    return {
        "sentiment": sentiment,
        "sentiment_scores": sentiment_dict,
        "polarity": polarity,
        "subjectivity": subjectivity,
        "confidence": abs(polarity),
        "emotions": emotions,
        "language": language,
        "keywords": keywords[:10],
        "word_cloud": wordcloud_image,
        "emoji_analysis": dict(emoji_count),
        "text_length": len(text),
        "word_count": len(text.split()),
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/analyze', methods=['POST'])
@limiter.limit("10 per minute")
@cache.memoize(timeout=300)
def analyze():
    try:
        data = request.get_json()
        if data and 'text' in data:
            text = data['text']
        elif request.form and 'text' in request.form:
            text = request.form['text']
        elif request.files and 'file' in request.files:
            file = request.files['file']
            text = extract_text_from_file(file)
        else:
            return jsonify({'error': 'No text or file provided'}), 400

        result = analyze_sentiment(text)
        
        # Store in history
        user_id = request.headers.get('X-User-Id', 'anonymous')
        analysis_history[user_id].append({
            'text': text,
            'result': result,
            'timestamp': datetime.datetime.now().isoformat()
        })
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/analyze-file', methods=['POST'])
@limiter.limit("5 per minute")
def analyze_file():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        text = extract_text_from_file(file)
        result = analyze_sentiment(text)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = request.headers.get('X-User-Id', 'anonymous')
    return jsonify(analysis_history[user_id])

@app.route('/api/export-history', methods=['GET'])
@jwt_required()
def export_history():
    user_id = request.headers.get('X-User-Id', 'anonymous')
    df = pd.DataFrame(analysis_history[user_id])
    
    output = io.BytesIO()
    df.to_csv(output, index=False)
    output.seek(0)
    
    return send_file(
        output,
        mimetype='text/csv',
        as_attachment=True,
        download_name='sentiment_analysis_history.csv'
    )

if __name__ == '__main__':
    # Download required NLTK data
    nltk.download('punkt')
    nltk.download('stopwords')
    
    app.run(debug=True, host='0.0.0.0', port=8000)
