import { useEffect, useState } from 'react';
import { CustomAppBar } from './containers/AppBar/AppBar';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import AppRoutes from './Routes';
import { Providers } from './Providers';
import { LoadingScreen } from './components/LoadingState/LoadingScreen';
import { SpeedInsights } from '@vercel/speed-insights/react';
import supabase from './services/supabase';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = isMobile ? 56 : 64;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoading(false);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
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
          <CustomAppBar authState={session} />
          <Box
            sx={{
              overflowY: 'auto',
              mt: `${appBarHeight}px`,
            }}
          >
            <AppRoutes authState={session} />
            <SpeedInsights />
          </Box>
        </Box>
      )}
    </Providers>
  );
}
