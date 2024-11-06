import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import { indigo, teal } from '@mui/material/colors';

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
            main: mode === 'light' ? teal[500] : teal[300],
          },
          secondary: {
            main: mode === 'light' ? indigo[600] : indigo[200],
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1c1c1c',
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
