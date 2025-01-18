import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const HomeCharts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample data for sentiment trends
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Positive Sentiment',
        data: [65, 75, 70, 80, 85, 90],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Negative Sentiment',
        data: [35, 25, 30, 20, 15, 10],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Sample data for emotion distribution
  const pieChartData = {
    labels: ['Joy', 'Sadness', 'Anger', 'Fear', 'Surprise', 'Love'],
    datasets: [
      {
        data: [30, 15, 10, 12, 18, 15],
        backgroundColor: [
          '#4caf50',
          '#2196f3',
          '#f44336',
          '#ff9800',
          '#9c27b0',
          '#e91e63',
        ],
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
      },
    ],
  };

  // Sample data for language analysis
  const barChartData = {
    labels: ['English', 'Spanish', 'French', 'German', 'Italian'],
    datasets: [
      {
        label: 'Text Analysis by Language',
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(76, 175, 80, 0.6)',
          'rgba(33, 150, 243, 0.6)',
          'rgba(244, 67, 54, 0.6)',
          'rgba(255, 152, 0, 0.6)',
          'rgba(156, 39, 176, 0.6)',
        ],
        borderColor: [
          '#4caf50',
          '#2196f3',
          '#f44336',
          '#ff9800',
          '#9c27b0',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'top',
        labels: {
          color: theme.palette.text.primary,
        },
      },
      title: {
        display: true,
        color: theme.palette.text.primary,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
      x: {
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: {
          color: theme.palette.text.primary,
        },
      },
    },
  };

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h5" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
        Sentiment Analysis Overview
      </Typography>
      <Grid container spacing={3}>
        {/* Sentiment Trends Chart */}
        <Grid item xs={12} md={8}>
          <Card className="chart-card" elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sentiment Trends
              </Typography>
              <Box sx={{ height: 300, position: 'relative' }}>
                <Line data={lineChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Emotion Distribution Chart */}
        <Grid item xs={12} md={4}>
          <Card className="chart-card" elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Emotion Distribution
              </Typography>
              <Box sx={{ height: 300, position: 'relative' }}>
                <Pie data={pieChartData} options={pieOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Language Analysis Chart */}
        <Grid item xs={12}>
          <Card className="chart-card" elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Language Analysis
              </Typography>
              <Box sx={{ height: 300, position: 'relative' }}>
                <Bar data={barChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeCharts;
