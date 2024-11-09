import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';

const colors = {
  light: {
    primaryMain: '#B8860B',
    secondaryMain: '#8B4513',
    backgroundDefault: '#fffcec',
    backgroundPaper: '#FFF8E1',
    textPrimary: '#000000',
  },
  dark: {
    primaryMain: '#e47f3e',
    secondaryMain: '#FFD59E',
    backgroundDefault: '#17120c',
    backgroundPaper: '#1D1A17',
    textPrimary: '#ffffff',
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
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
            paper: mode === 'light' ? colors.light.backgroundPaper : colors.dark.backgroundPaper,
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
