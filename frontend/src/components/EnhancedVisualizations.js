import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button,
  Grid 
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import ReactWordcloud from 'react-wordcloud';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EnhancedVisualizations = ({ data, timelineData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Sentiment Analysis Report', 20, 20);
    
    // Add timestamp
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
    
    // Add sentiment scores
    doc.autoTable({
      head: [['Metric', 'Score']],
      body: [
        ['Positive', data.sentiment_scores.positive],
        ['Negative', data.sentiment_scores.negative],
        ['Neutral', data.sentiment_scores.neutral],
      ],
      startY: 40,
    });
    
    // Add emotions
    doc.autoTable({
      head: [['Emotion', 'Score']],
      body: Object.entries(data.emotions),
      startY: doc.lastAutoTable.finalY + 10,
    });
    
    doc.save('sentiment-analysis-report.pdf');
  };

  const wordcloudOptions = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [12, 60],
    padding: 5,
  };

  const words = data.keywords.map(keyword => ({
    text: keyword,
    value: Math.floor(Math.random() * 100) + 20, // Replace with actual frequency/importance
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              Enhanced Visualizations
            </Typography>
            <Box>
              <Button 
                variant="outlined" 
                onClick={generatePDF} 
                sx={{ mr: 1 }}
              >
                Export PDF
              </Button>
              <CSVLink 
                data={timelineData} 
                filename="sentiment-timeline.csv"
                style={{ textDecoration: 'none' }}
              >
                <Button variant="outlined">
                  Export CSV
                </Button>
              </CSVLink>
            </Box>
          </Box>

          {/* Sentiment Timeline */}
          <Typography variant="subtitle1" gutterBottom>
            Sentiment Trends Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#4caf50" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#f44336" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#2196f3" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Interactive Word Cloud */}
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
            Interactive Word Cloud
          </Typography>
          <Box sx={{ height: 400 }}>
            <ReactWordcloud 
              words={words} 
              options={wordcloudOptions}
              callbacks={{
                onWordClick: word => {
                  console.log('Word clicked:', word);
                  // Add your word click handler here
                }
              }}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EnhancedVisualizations;
