import React, { useEffect, useState } from 'react';
import CustomAppBar from './components/AppBar/AppBar';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRoutes from './Routes';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './services/firebase';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const App: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const changeAuthState = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => changeAuthState();
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              height: `${windowHeight}px`,
              bgcolor: 'background.default',
              color: 'text.primary',
            }}
          >
            <CustomAppBar user={user} />
            <AppRoutes user={user} />
          </Box>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
