import React from 'react';
import CustomAppBar from './components/AppBar';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import AppRoutes from './Routes';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CustomAppBar />
        <Box sx={{ p: 2, height: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
          <AppRoutes />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
