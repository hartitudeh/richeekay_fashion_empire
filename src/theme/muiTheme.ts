'use client';

import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37', // Royal Gold
      light: '#F4E798',
      dark: '#C9A227',
      contrastText: '#0A0A0A',
    },
    secondary: {
      main: '#F8F5EF', // Soft Cream
      contrastText: '#0A0A0A',
    },
    background: {
      default: '#0A0A0A',
      paper: '#1F1F1F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D4AF37',
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Poppins', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: "'Montserrat', sans-serif",
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sharp luxury corners
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '1.5px',
          padding: '12px 28px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: 'linear-gradient(135deg, #D4AF37 0%, #C9A227 100%)',
          color: '#0A0A0A',
          boxShadow: '0 4px 15px rgba(201, 162, 39, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #F4E798 0%, #D4AF37 100%)',
            boxShadow: '0 6px 20px rgba(212, 175, 55, 0.5)',
          },
        },
        outlined: {
          borderColor: '#D4AF37',
          color: '#D4AF37',
          '&:hover': {
            borderColor: '#F4E798',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#D4AF37',
          height: '3px',
          boxShadow: '0 0 10px #D4AF37',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.05rem',
          fontWeight: 600,
          textTransform: 'none',
          color: 'rgba(255, 255, 255, 0.7)',
          letterSpacing: '0.5px',
          padding: '12px 24px',
          '&.Mui-selected': {
            color: '#D4AF37',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1F1F1F',
          border: '1px solid rgba(201, 162, 39, 0.2)',
          borderRadius: 0,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#D4AF37',
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#141414',
          border: '1px solid #C9A227',
          borderRadius: 0,
        },
      },
    },
  },
});
