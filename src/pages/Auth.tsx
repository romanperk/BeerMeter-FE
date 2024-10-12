import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../services/firebase';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      const userId = userCredential.user.uid;
      dispatch(login(userId));
      navigate(`/`);
    } catch {
      setError(`Authentication failed. Check your credentials.`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userId = userCredential.user.uid;
      dispatch(login(userId));
      navigate(`/`);
    } catch {
      setError(`Google sign-in failed`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
        <Typography variant="h4">{isLogin ? 'Login' : 'Sign Up'}</Typography>
        <form onSubmit={handleAuth} style={{ width: '100%', marginTop: '1rem' }}>
          <TextField
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            variant="outlined"
            type="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            fullWidth
            margin="normal"
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" type="submit" fullWidth>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Button variant="outlined" onClick={handleGoogleSignIn} fullWidth sx={{ marginTop: '1rem' }}>
            Login with Google
          </Button>
        </form>
        <Button variant="text" onClick={() => setIsLogin(!isLogin)} sx={{ marginTop: '1rem' }}>
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
