# Sentiment Analysis Application

A powerful, modern web application that performs advanced sentiment analysis with rich visualizations and real-time processing capabilities. Built with React and Python, featuring an intuitive UI and comprehensive analysis tools.

## 🌟 Key Features

### Real-Time Analysis
- Instant sentiment analysis of text input
- Live confidence scoring
- Keyword and key phrase extraction
- Entity detection and classification
- Voice input support for hands-free analysis

### Advanced Visualizations
- Interactive sentiment charts and graphs
- Word clouds for frequency analysis
- Dynamic data visualization
- Sentiment score timeline
- Comparative analysis visualization

### Social Media Integration
- Analyze social media posts
- Support for multiple platforms
- Hashtag and trend analysis
- Bulk social media content analysis

### Enhanced User Experience
- Dark/Light theme toggle
- Responsive Material-UI design
- Smooth animations and transitions
- Mobile-friendly interface
- Keyboard shortcuts support

### Data Processing
- Multi-language text support
- Batch text processing
- File upload capabilities
- Export results in multiple formats
- Real-time data updates

## 🛠️ Tech Stack
- **Frontend**: 
  - React.js
  - Material-UI
  - Framer Motion
  - Chart.js
  - D3.js
- **Backend**: 
  - Python
  - Flask
  - TextBlob
  - NLTK
- **Additional Tools**:
  - Axios for HTTP requests
  - React Router for navigation
  - Context API for state management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn
- Git

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate virtual environment:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Unix/MacOS
   python -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   python app.py
   ```
   Server will run on `http://localhost:8000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   Application will be available at `http://localhost:5000`

## 📱 Usage Guide

### Basic Analysis
1. Enter or paste text in the analysis input field
2. Click "Analyze" or press Enter
3. View sentiment results and confidence score
4. Explore extracted keywords and entities

### Voice Input
1. Click the microphone icon
2. Speak your text clearly
3. The analysis will start automatically

### Visualization Tools
1. Access different visualization types from the dashboard
2. Interact with charts for detailed insights
3. Toggle between different data views
4. Export visualizations as needed

### Theme Customization
1. Use the theme toggle in the top bar
2. Switch between light and dark modes
3. UI automatically adapts to system preferences

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:8000
```

### API Endpoints
- `/api/analyze` - Text sentiment analysis
- `/api/batch` - Batch text processing
- `/api/social` - Social media analysis

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
