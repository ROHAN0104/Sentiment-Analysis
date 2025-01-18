import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceInput = ({ onTranscriptComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  const handleStart = () => {
    try {
      setError(null);
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } catch (err) {
      setError('Failed to start voice recognition');
      console.error(err);
    }
  };

  const handleStop = () => {
    try {
      SpeechRecognition.stopListening();
      if (transcript) {
        onTranscriptComplete(transcript);
      }
    } catch (err) {
      setError('Failed to stop voice recognition');
      console.error(err);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Alert severity="error">
          Your browser doesn't support speech recognition.
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Voice Input
        </Typography>
        <IconButton
          color={isListening ? 'error' : 'primary'}
          onClick={isListening ? handleStop : handleStart}
          sx={{ 
            position: 'relative',
            '&::after': isListening ? {
              content: '""',
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              border: '2px solid',
              borderColor: 'error.main',
              borderRadius: '50%',
              animation: 'ripple 1.5s infinite',
            } : {}
          }}
        >
          {isListening ? <StopIcon /> : <MicIcon />}
        </IconButton>
      </Box>

      {isListening && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Listening...
          </Typography>
        </Box>
      )}

      {transcript && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {transcript}
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <style>
        {`
          @keyframes ripple {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
        `}
      </style>
    </Paper>
  );
};

export default VoiceInput;
