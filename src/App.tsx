import React from 'react';
import CustomAppBar from './components/AppBar';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/auth/store';
import AppRoutes from './Routes';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CustomAppBar />
          <Box sx={{ p: 2, height: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
            <AppRoutes />
          </Box>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
