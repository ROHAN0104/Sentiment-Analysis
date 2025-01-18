import React from 'react';
import { Box, Typography } from '@mui/material';

const GeoSentimentMap = ({ geoData }) => {
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Geographic Sentiment Distribution
      </Typography>
      <Box sx={{ 
        p: 2, 
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1
      }}>
        {/* Placeholder for geographic visualization */}
        <Typography>
          Geographic data points: {geoData?.length || 0}
        </Typography>
      </Box>
    </Box>
  );
};

export default GeoSentimentMap;
