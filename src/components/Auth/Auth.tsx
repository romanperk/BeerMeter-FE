import GoogleIcon from '@mui/icons-material/Google';
import { Button, TextField, Typography, Container, Box, CssBaseline, Divider } from '@mui/material';

interface AuthPageProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  isLogin: boolean;
  handleAuth: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
}

export default function AuthPage({
  email,
  setEmail,
  password,
  setPassword,
  setIsLogin,
  error,
  isLogin,
  handleAuth,
  handleGoogleSignIn,
}: AuthPageProps) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">{isLogin ? 'Welcome back' : 'Sign Up'}</Typography>
        <Box component="form" onSubmit={handleAuth} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>

          <Divider sx={{ mt: 3, mb: 3 }}>OR</Divider>

          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ mb: 2 }} onClick={handleGoogleSignIn}>
            Login with Google
          </Button>
        </Box>

        <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </Button>
      </Box>
    </Container>
  );
}
