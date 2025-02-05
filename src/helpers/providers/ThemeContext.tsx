import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';

const colors = {
  light: {
    primaryMain: '#B8860B',
    secondaryMain: '#8B4513',
    backgroundDefault: '#FFFFFF',
    textPrimary: '#212121',
  },
  dark: {
    primaryMain: '#E47F3E',
    secondaryMain: '#FFD59E',
    backgroundDefault: '#000000',
    textPrimary: '#F5F5F5',
  },
};

interface ThemeContextProps {
  toggleTheme: () => void;
  mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider');
  return context;
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? colors.light.primaryMain : colors.dark.primaryMain,
          },
          secondary: {
            main: mode === 'light' ? colors.light.secondaryMain : colors.dark.secondaryMain,
          },
          background: {
            default: mode === 'light' ? colors.light.backgroundDefault : colors.dark.backgroundDefault,
          },
          text: {
            primary: mode === 'light' ? colors.light.textPrimary : colors.dark.textPrimary,
          },
        },
        typography: {
          fontFamily: 'Poppins, sans-serif',
          h1: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '0.75rem',
          },
          h2: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.3,
            marginBottom: '0.5rem',
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '24px',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.2)',
                },
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                color: mode === 'light' ? colors.light.textPrimary : colors.dark.textPrimary,
              },
            },
          },
          MuiModal: {
            styleOverrides: {
              root: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: ({ theme }) => ({
                maxWidth: 300,
                [theme.breakpoints.down('md')]: {
                  width: 350,
                },
                [theme.breakpoints.down('sm')]: {
                  width: 250,
                },
                position: 'absolute',
                top: '10%',
                padding: theme.spacing(4),
                borderRadius: '16px', 
              }),
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: ({ theme, ownerState }) => ({
                ...(
                ownerState.square === false &&
                ownerState.component !== 'header'
                  ? {
                      backgroundColor: theme.palette.mode === 'dark' ? '#000000' : theme.palette.background.paper,
                      boxShadow: theme.palette.mode === 'dark' ? '0px 4px 10px rgba(255, 255, 255, 0.1)' : theme.shadows[3],
                    }
                  : {}),
              }),
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
