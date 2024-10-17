import { useEffect, useState } from 'react';
import { CustomAppBar } from './containers/AppBar/AppBar';
import { Box } from '@mui/material';
import AppRoutes from './Routes';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './services/firebase';
import { Providers } from './Providers';
import { LoadingScreen } from './components/LoadingState/LoadingScreen';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <CustomAppBar authState={user} />
          <Box
            sx={{
              overflowY: 'auto',
              padding: 3,
            }}
          >
            <AppRoutes authState={user} />
          </Box>
        </Box>
      )}
    </Providers>
  );
}
