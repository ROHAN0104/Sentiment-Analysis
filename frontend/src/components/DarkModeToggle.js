import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../contexts/ColorModeContext';

const DarkModeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      sx={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        '&:hover': {
          bgcolor: theme.palette.action.hover,
        },
        zIndex: 1000,
      }}
      aria-label="Toggle dark mode"
    >
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon sx={{ color: theme.palette.primary.main }} />
      ) : (
        <Brightness4Icon sx={{ color: theme.palette.primary.main }} />
      )}
    </IconButton>
  );
};

export default DarkModeToggle;
