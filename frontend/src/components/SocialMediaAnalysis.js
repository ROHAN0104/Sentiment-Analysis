import React, { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Tab,
  Tabs,
  CircularProgress
} from '@mui/material';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { FacebookEmbed } from 'react-social-media-embed';

const SocialMediaAnalysis = ({ onAnalysisComplete }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setUrl('');
  };

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/analyze-social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url,
          platform: activeTab === 0 ? 'twitter' : 'facebook' 
        }),
      });
      
      const data = await response.json();
      onAnalysisComplete(data);
    } catch (error) {
      console.error('Social media analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Social Media Analysis
      </Typography>
      
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Twitter" />
        <Tab label="Facebook" />
      </Tabs>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Enter ${activeTab === 0 ? 'Twitter' : 'Facebook'} post URL...`}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleAnalyze}
          disabled={loading || !url.trim()}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Analyze'}
        </Button>
      </Box>

      {activeTab === 0 && url && url.includes('twitter.com') && (
        <Box sx={{ mb: 2 }}>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={url.split('twitter.com/')[1]?.split('/')[0]}
            options={{ height: 400 }}
          />
        </Box>
      )}

      {activeTab === 1 && url && url.includes('facebook.com') && (
        <Box sx={{ mb: 2 }}>
          <FacebookEmbed url={url} width="100%" />
        </Box>
      )}
    </Paper>
  );
};

export default SocialMediaAnalysis;
