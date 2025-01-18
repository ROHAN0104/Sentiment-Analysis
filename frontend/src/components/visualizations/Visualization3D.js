import React from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';

const Visualization3D = ({ sentimentData }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4,
        m: 2,
        minHeight: '400px',
        borderRadius: 2,
        background: (theme) => 
          theme.palette.mode === 'dark' 
            ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: (theme) => theme.shadows[6],
        }
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          mb: 4,
          fontWeight: 600,
          textAlign: 'center',
          color: (theme) => theme.palette.primary.main
        }}
      >
        Sentiment Analysis Results
      </Typography>

      <Box sx={{ p: 3 }}>
        {['positive', 'negative', 'neutral'].map((type) => (
          <Box key={type} sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 1,
                textTransform: 'capitalize',
                color: (theme) => 
                  type === 'positive' ? '#4caf50' :
                  type === 'negative' ? '#f44336' :
                  theme.palette.text.primary
              }}
            >
              {type}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(sentimentData?.[type] * 100) || 0}
              sx={{
                height: 20,
                borderRadius: 2,
                backgroundColor: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 
                    type === 'positive' ? '#4caf50' :
                    type === 'negative' ? '#f44336' :
                    '#607d8b',
                  borderRadius: 2,
                }
              }}
            />
            <Typography 
              variant="body1" 
              sx={{ 
                mt: 1,
                textAlign: 'right',
                fontWeight: 500
              }}
            >
              {((sentimentData?.[type] * 100) || 0).toFixed(1)}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Visualization3D;
