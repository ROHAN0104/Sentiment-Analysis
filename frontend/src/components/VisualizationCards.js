import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import ReactWordcloud from 'react-wordcloud';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// Word cloud options
const wordCloudOptions = {
  colors: ['#1976d2', '#dc004e', '#4caf50', '#ff9800', '#9c27b0'],
  enableTooltip: true,
  deterministic: true,
  fontFamily: 'impact',
  fontSizes: [20, 60],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: 'sqrt',
  spiral: 'archimedean',
  transitionDuration: 1000,
};

export const EmotionPieChart = ({ emotions }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const data = {
    labels: Object.keys(emotions),
    datasets: [
      {
        data: Object.values(emotions).map(score => score * 100),
        backgroundColor: [
          '#4caf50',
          '#ff9800',
          '#f44336',
          '#2196f3',
          '#9c27b0',
          '#795548',
        ],
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: {
          color: theme.palette.text.primary,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw.toFixed(1)}%`,
        },
      },
    },
  };

  return (
    <Card className="metric-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Emotion Distribution
        </Typography>
        <Box sx={{ height: isMobile ? 200 : 300, position: 'relative' }}>
          <Pie data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export const SentimentBarChart = ({ sentimentScores }) => {
  const theme = useTheme();
  
  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment Score',
        data: [
          sentimentScores.positive * 100,
          sentimentScores.neutral * 100,
          sentimentScores.negative * 100,
        ],
        backgroundColor: [
          'rgba(76, 175, 80, 0.6)',
          'rgba(33, 150, 243, 0.6)',
          'rgba(244, 67, 54, 0.6)',
        ],
        borderColor: [
          'rgb(76, 175, 80)',
          'rgb(33, 150, 243)',
          'rgb(244, 67, 54)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Sentiment Analysis Scores',
        color: theme.palette.text.primary,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      x: {
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
    },
  };

  return (
    <Card className="metric-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sentiment Distribution
        </Typography>
        <Box sx={{ height: 300, position: 'relative' }}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export const WordCloudCard = ({ words }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Transform words array into the format required by react-wordcloud
  const wordCloudData = words.map(word => ({
    text: word,
    value: Math.floor(Math.random() * 50) + 10, // Random value for demonstration
  }));

  return (
    <Card className="metric-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Word Cloud
        </Typography>
        <Box 
          sx={{ 
            height: isMobile ? 200 : 300,
            width: '100%',
            '& > div': {
              height: '100% !important',
              width: '100% !important',
            },
          }}
        >
          <ReactWordcloud
            words={wordCloudData}
            options={{
              ...wordCloudOptions,
              colors: theme.palette.mode === 'dark'
                ? ['#90caf9', '#f48fb1', '#81c784', '#ffb74d', '#ce93d8']
                : ['#1976d2', '#dc004e', '#4caf50', '#ff9800', '#9c27b0'],
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
