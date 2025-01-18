import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';

const AIPoweredAnalysis = ({ aiData }) => {
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
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 4
        }}
      >
        <PsychologyIcon 
          sx={{ 
            fontSize: 40, 
            mr: 2,
            color: (theme) => theme.palette.primary.main
          }} 
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main
          }}
        >
          AI-Powered Insights
        </Typography>
      </Box>

      <List sx={{ width: '100%' }}>
        {Object.entries(aiData).map(([key, value], index, arr) => (
          <React.Fragment key={index}>
            <ListItem 
              sx={{ 
                py: 2,
                px: 3,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: (theme) => 
                    theme.palette.mode === 'dark' 
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.02)',
                }
              }}
            >
              <ListItemText 
                primary={
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      textTransform: 'capitalize',
                      fontWeight: 500,
                      mb: 1,
                      color: (theme) => theme.palette.primary.main
                    }}
                  >
                    {key.replace(/_/g, ' ')}
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: (theme) => theme.palette.text.secondary
                    }}
                  >
                    {value}
                  </Typography>
                }
              />
            </ListItem>
            {index < arr.length - 1 && (
              <Divider 
                variant="middle" 
                sx={{ 
                  my: 1,
                  opacity: 0.5
                }} 
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default AIPoweredAnalysis;
