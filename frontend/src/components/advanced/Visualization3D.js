import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Box, Paper, Typography } from '@mui/material';

function SentimentCube({ position, size, color, label, value }) {
  return (
    <>
      <mesh position={position}>
        <boxGeometry args={[size, size * value, size]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[position[0], position[1] + size * value + 0.2, position[2]]}
        fontSize={0.2}
        color="black"
      >
        {`${label}: ${(value * 100).toFixed(1)}%`}
      </Text>
    </>
  );
}

const Visualization3D = ({ sentimentData }) => {
  const canvasRef = useRef();

  useEffect(() => {
    // Handle any necessary canvas updates
  }, [sentimentData]);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        3D Sentiment Visualization
      </Typography>
      <Box sx={{ height: '400px', width: '100%' }}>
        <Canvas camera={{ position: [0, 2, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          
          {/* Positive Sentiment */}
          <SentimentCube
            position={[-2, 0, 0]}
            size={1}
            color="#4caf50"
            label="Positive"
            value={sentimentData?.positive || 0}
          />
          
          {/* Neutral Sentiment */}
          <SentimentCube
            position={[0, 0, 0]}
            size={1}
            color="#2196f3"
            label="Neutral"
            value={sentimentData?.neutral || 0}
          />
          
          {/* Negative Sentiment */}
          <SentimentCube
            position={[2, 0, 0]}
            size={1}
            color="#f44336"
            label="Negative"
            value={sentimentData?.negative || 0}
          />
        </Canvas>
      </Box>
    </Paper>
  );
};

export default Visualization3D;
