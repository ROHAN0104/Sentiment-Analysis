import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  LinearProgress
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const AIPoweredAnalysis = ({ aiData }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        AI-Powered Insights
      </Typography>
      
      <Grid container spacing={3}>
        {/* Sentiment Prediction */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Sentiment Prediction</Typography>
              </Box>
              {aiData?.predictions?.map((pred, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {pred.timeframe}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={pred.confidence * 100}
                        color={pred.sentiment > 0 ? "success" : "error"}
                      />
                    </Box>
                    <Typography variant="body2">
                      {(pred.confidence * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Topic Clustering */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CategoryIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Topic Clusters</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {aiData?.topics?.map((topic, index) => (
                  <Chip
                    key={index}
                    label={`${topic.name} (${topic.weight.toFixed(2)})`}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Entity Recognition */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Entity Recognition</Typography>
              </Box>
              <List dense>
                {aiData?.entities?.map((entity, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={entity.name}
                      secondary={`Type: ${entity.type} | Sentiment: ${entity.sentiment.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Improvement Suggestions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AutoFixHighIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Improvement Suggestions</Typography>
              </Box>
              <List dense>
                {aiData?.suggestions?.map((suggestion, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={suggestion.title}
                      secondary={suggestion.description}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AIPoweredAnalysis;
