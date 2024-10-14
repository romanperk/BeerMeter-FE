import { useEffect, useState } from 'react';
import { CustomAppBar } from './containers/AppBar';
import { Box, createTheme, ThemeProvider, CircularProgress, Typography } from '@mui/material';
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

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const changeAuthState = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => changeAuthState();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2, color: 'text.primary' }}>
            Loading...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              bgcolor: 'background.default',
              color: 'text.primary',
            }}
          >
            <CustomAppBar user={user} />
            <Box
              sx={{
                overflowY: 'auto',
                padding: 3,
              }}
            >
              <AppRoutes user={user} />
            </Box>
          </Box>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}
