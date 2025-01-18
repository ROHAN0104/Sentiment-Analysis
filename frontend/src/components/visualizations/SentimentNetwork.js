import React from 'react';
import { Box, Typography } from '@mui/material';

const SentimentNetwork = ({ networkData }) => {
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Sentiment Network Analysis
      </Typography>
      <Box sx={{ 
        p: 2, 
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1
      }}>
        {/* Placeholder for network visualization */}
        <Typography>
          Network connections: {Object.keys(networkData).length || 0}
        </Typography>
      </Box>
    </Box>
  );
};

export default SentimentNetwork;
