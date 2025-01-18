import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { Box, Paper, Typography } from '@mui/material';

const GeoSentimentMap = ({ geoData }) => {
  const globeEl = useRef();

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const markerData = geoData?.map(item => ({
    lat: item.latitude,
    lng: item.longitude,
    size: Math.abs(item.sentiment) * 20,
    color: item.sentiment > 0 ? '#4caf50' : '#f44336',
    label: item.location
  })) || [];

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Global Sentiment Distribution
      </Typography>
      <Box sx={{ height: '500px', width: '100%' }}>
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          pointsData={markerData}
          pointAltitude="size"
          pointColor="color"
          pointLabel="label"
          pointRadius={0.5}
          atmosphereColor="#ffffff"
          atmosphereAltitude={0.1}
        />
      </Box>
    </Paper>
  );
};

export default GeoSentimentMap;
