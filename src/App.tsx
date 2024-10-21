import { useEffect, useState } from 'react';
import { CustomAppBar } from './containers/AppBar/AppBar';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import AppRoutes from './Routes';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './services/firebase';
import { Providers } from './Providers';
import { LoadingScreen } from './components/LoadingState/LoadingScreen';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = isMobile ? 56 : 64;

  useEffect(() => {
    const changeAuthState = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUser(user);
    });
    return () => changeAuthState();
  }, []);

  return (
    <Providers>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <CustomAppBar authState={user} />
          <Box
            sx={{
              overflowY: 'auto',
              mt: `${appBarHeight}px`,
            }}
          >
            <AppRoutes authState={user} />
          </Box>
        </Box>
      )}
    </Providers>
  );
}
