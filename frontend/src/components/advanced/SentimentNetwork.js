import React from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { Paper, Typography, Box } from '@mui/material';

const SentimentNetwork = ({ networkData }) => {
  const graphData = {
    nodes: networkData?.entities?.map(entity => ({
      id: entity.name,
      val: Math.abs(entity.sentiment) * 2,
      color: entity.sentiment > 0 ? '#4caf50' : 
             entity.sentiment < 0 ? '#f44336' : '#2196f3'
    })) || [],
    links: networkData?.relationships?.map(rel => ({
      source: rel.source,
      target: rel.target,
      value: Math.abs(rel.strength)
    })) || []
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Sentiment Relationship Network
      </Typography>
      <Box sx={{ height: '500px', width: '100%' }}>
        <ForceGraph3D
          graphData={graphData}
          nodeLabel="id"
          nodeVal="val"
          nodeColor="color"
          linkWidth="value"
          backgroundColor="#ffffff"
        />
      </Box>
    </Paper>
  );
};

export default SentimentNetwork;
