import React, { useState } from 'react';
import { TextField, Paper, Typography, Box, Button, CircularProgress, Chip, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyzeIcon from '@mui/icons-material/Psychology';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(45, 45, 45, 0.9)' 
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease-in-out',
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(45, 45, 45, 0.8)' 
      : 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      transform: 'scale(1.02)',
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(55, 55, 55, 0.8)' 
        : 'rgba(255, 255, 255, 0.9)',
    },
    '&.Mui-focused': {
      transform: 'scale(1.02)',
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(55, 55, 55, 0.8)' 
        : 'rgba(255, 255, 255, 0.9)',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
}));

const AnimatedButton = styled(motion.div)({
  display: 'inline-block',
});

const ResultCard = styled(motion.div)(({ theme, sentiment }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(45, 45, 45, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  border: '1px solid',
  borderColor: sentiment === 'positive' ? '#4caf50' : 
               sentiment === 'negative' ? '#f44336' : '#ff9800',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 6px rgba(0, 0, 0, 0.3)'
    : '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease-in-out',
}));

const RealTimeAnalysis = ({ onAnalysisComplete }) => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'positive':
        return <SentimentSatisfiedAltIcon sx={{ color: '#4caf50' }} />;
      case 'negative':
        return <SentimentVeryDissatisfiedIcon sx={{ color: '#f44336' }} />;
      default:
        return <SentimentNeutralIcon sx={{ color: '#ff9800' }} />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'positive':
        return '#4caf50';
      case 'negative':
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setAnalyzing(true);
    setResult(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      setResult(data);
      onAnalysisComplete(data);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography 
        className="section-title"
        component="h2"
        sx={{ mb: 3 }}
      >
        REAL-TIME ANALYSIS
      </Typography>

      <StyledPaper elevation={3} sx={{ p: 3, mb: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            Sentiment Analysis
          </Typography>
        </motion.div>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <StyledTextField
            sx={{ flex: 1 }}
            multiline
            rows={3}
            variant="outlined"
            placeholder="Enter text to analyze..."
            value={text}
            onChange={handleTextChange}
            InputProps={{
              sx: {
                borderRadius: '12px',
              }
            }}
          />
          <AnimatedButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAnalyze}
              disabled={analyzing || !text.trim()}
              startIcon={analyzing ? <CircularProgress size={20} /> : <AnalyzeIcon />}
              sx={{
                minWidth: '120px',
                height: '56px',
                borderRadius: '12px',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                  : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 3px 5px 2px rgba(144, 202, 249, .3)'
                  : '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: theme.palette.mode === 'dark' ? '#000' : 'white',
                '&:disabled': {
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #424242 30%, #616161 90%)'
                    : 'linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)',
                  color: theme.palette.mode === 'dark' ? '#666' : '#fff',
                }
              }}
            >
              {analyzing ? 'Analyzing...' : 'Analyze'}
            </Button>
          </AnimatedButton>
        </Box>

        <AnimatePresence>
          {result && (
            <ResultCard
              sentiment={result.sentiment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                {getSentimentIcon(result.sentiment)}
                <Typography variant="h6" sx={{ color: getSentimentColor(result.sentiment) }}>
                  {result.sentiment ? `${result.sentiment.charAt(0).toUpperCase()}${result.sentiment.slice(1)} Sentiment` : 'Unknown Sentiment'}
                </Typography>
                <Chip 
                  label={`${((result.confidence || 0) * 100).toFixed(1)}% Confidence`}
                  sx={{ 
                    backgroundColor: `${getSentimentColor(result.sentiment)}20`,
                    color: getSentimentColor(result.sentiment),
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {result.keywords && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                      Key Phrases:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {result.keywords.map((keyword, index) => (
                        <Chip
                          key={index}
                          label={keyword}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? 'rgba(144, 202, 249, 0.1)'
                              : 'rgba(33, 150, 243, 0.1)',
                            color: theme.palette.text.primary,
                            '&:hover': {
                              backgroundColor: theme.palette.mode === 'dark'
                                ? 'rgba(144, 202, 249, 0.2)'
                                : 'rgba(33, 150, 243, 0.2)',
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                
                {result.entities && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                      Entities Detected:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {result.entities.map((entity, index) => (
                        <Chip
                          key={index}
                          label={`${entity.text} (${entity.type})`}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(156, 39, 176, 0.15)'
                              : 'rgba(156, 39, 176, 0.1)',
                            color: theme.palette.text.primary,
                            '&:hover': {
                              backgroundColor: theme.palette.mode === 'dark'
                                ? 'rgba(156, 39, 176, 0.25)'
                                : 'rgba(156, 39, 176, 0.2)',
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </ResultCard>
          )}
        </AnimatePresence>
      </StyledPaper>
    </motion.div>
  );
};

export default RealTimeAnalysis;
