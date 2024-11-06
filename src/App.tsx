import { useEffect, useState } from 'react';
import { CustomAppBar } from './containers/AppBar/AppBar';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import AppRoutes from './Routes';
import { Providers } from './Providers';
import { LoadingScreen } from './components/LoadingState/LoadingScreen';
import { SpeedInsights } from '@vercel/speed-insights/react';
import supabase from './services/supabase';
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/users/userSlice';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const dispatch = useDispatch();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = isMobile ? 56 : 64;

  useEffect(() => {
    const handleAuthChange = async (newSession: Session | null) => {
      setSession(newSession);
      setLoading(false);

      if (newSession) {
        dispatch(login({ userId: newSession.user.id, email: newSession.user.email }));

        const { data: existingUser } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_id', newSession.user.id)
          .single();

        if (!existingUser) {
          const { error: insertError } = await supabase
            .from('users')
            .insert({ user_id: newSession.user.id, email: newSession.user.email });

          if (insertError) console.error('Error inserting user:', insertError);
        }
      } else {
        dispatch(logout());
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthChange(session);
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
            backgroundImage: (theme) =>
              theme.palette.mode === 'dark'
                ? 'radial-gradient(#ff8f00, #000000)'
                : 'radial-gradient(#ffc107, #f8f8f8)',
            backgroundSize: (theme) => (theme.palette.mode === 'dark' ? '500% 1500%' : '500% 1000%'),
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
