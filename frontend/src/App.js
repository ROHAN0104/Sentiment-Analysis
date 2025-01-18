import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  useMediaQuery,
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Snackbar,
  Alert
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PublicIcon from '@mui/icons-material/Public';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PsychologyIcon from '@mui/icons-material/Psychology';

import { ColorModeContext } from './contexts/ColorModeContext';
import DarkModeToggle from './components/DarkModeToggle';
import RealTimeAnalysis from './components/RealTimeAnalysis';
import SocialMediaAnalysis from './components/SocialMediaAnalysis';
import VoiceInput from './components/VoiceInput';
import Visualization3D from './components/visualizations/Visualization3D';
import GeoSentimentMap from './components/visualizations/GeoSentimentMap';
import SentimentNetwork from './components/visualizations/SentimentNetwork';
import AIPoweredAnalysis from './components/visualizations/AIPoweredAnalysis';
import './App.css';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [error, setError] = useState(null);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [activeVisualization, setActiveVisualization] = useState('3d');

  React.useEffect(() => {
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          document.body.setAttribute('data-theme', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#2196F3',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#f5f7fa',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#ffffff' : '#333333',
            secondary: mode === 'dark' ? '#b0b0b0' : '#666666',
          },
        },
        typography: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: mode === 'dark' ? '#6b6b6b #2b2b2b' : '#959595 #f5f5f5',
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                  backgroundColor: mode === 'dark' ? '#2b2b2b' : '#f5f5f5',
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                  borderRadius: 8,
                  backgroundColor: mode === 'dark' ? '#6b6b6b' : '#959595',
                  minHeight: 24,
                  border: mode === 'dark' ? '3px solid #2b2b2b' : '3px solid #f5f5f5',
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAnalysisComplete = (result) => {
    console.log('Analysis complete:', result);
    setResults(result);
  };

  const handleVoiceTranscript = (transcript) => {
    console.log('Voice transcript:', transcript);
  };

  const visualizationActions = [
    { icon: <ViewInArIcon />, name: '3D View', value: '3d' },
    { icon: <PublicIcon />, name: 'Geographic', value: 'geo' },
    { icon: <AccountTreeIcon />, name: 'Network', value: 'network' },
    { icon: <PsychologyIcon />, name: 'AI Insights', value: 'ai' },
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
          <DarkModeToggle />
          
          <Container maxWidth="lg" sx={{ pt: 8, pb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, color: theme.palette.primary.main }}>
              Advanced Sentiment Analysis
            </Typography>

            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              sx={{ 
                mb: 4,
                '& .MuiTab-root': {
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }
              }}
            >
              <Tab label="Real-time Analysis" />
              <Tab label="Social Media" />
              <Tab label="URL Analysis" />
            </Tabs>

            {showVoiceInput && (
              <Box sx={{ mb: 4 }}>
                <VoiceInput onTranscriptComplete={handleVoiceTranscript} />
              </Box>
            )}

            {activeTab === 0 && (
              <RealTimeAnalysis onAnalysisComplete={handleAnalysisComplete} />
            )}

            {activeTab === 1 && (
              <SocialMediaAnalysis onAnalysisComplete={handleAnalysisComplete} />
            )}

            {activeTab === 2 && (
              <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  URL Content Analysis
                </Typography>
                {/* URL analysis component will be added here */}
                <Typography color="textSecondary">
                  Coming soon...
                </Typography>
              </Paper>
            )}

            {results && (
              <Box sx={{ mt: 4 }}>
                {activeVisualization === '3d' && (
                  <Visualization3D sentimentData={results.sentiment_scores} />
                )}
                {activeVisualization === 'geo' && (
                  <GeoSentimentMap geoData={results.geographical_data || []} />
                )}
                {activeVisualization === 'network' && (
                  <SentimentNetwork networkData={results.entity_relationships || {}} />
                )}
                {activeVisualization === 'ai' && (
                  <AIPoweredAnalysis aiData={results.ai_insights || {}} />
                )}
              </Box>
            )}
          </Container>

          <SpeedDial
            ariaLabel="Analysis Options"
            sx={{ 
              position: 'fixed', 
              bottom: 16, 
              right: 16,
              '& .MuiFab-primary': {
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                }
              }
            }}
            icon={<SpeedDialIcon />}
          >
            <SpeedDialAction
              icon={<MicIcon />}
              tooltipTitle="Voice Input"
              onClick={() => setShowVoiceInput(!showVoiceInput)}
            />
            {visualizationActions.map((action) => (
              <SpeedDialAction
                key={action.value}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => setActiveVisualization(action.value)}
              />
            ))}
          </SpeedDial>

          <Snackbar 
            open={!!error} 
            autoHideDuration={6000} 
            onClose={() => setError(null)}
          >
            <Alert 
              severity="error" 
              onClose={() => setError(null)}
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
