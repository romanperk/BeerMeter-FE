import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const Auth = () => {
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
        alert('Logged in successfully');
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert('Signed up successfully');
      }
      // Extract user ID
      const userId = userCredential.user.uid;
      console.log('User ID:', userId); // Do something with the user ID
    } catch (error: any) {
      setError(`Authentication failed. Check your credentials. '${error.message}'`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      alert('Logged in with Google successfully');
      const userId = userCredential.user.uid;
      console.log('User ID:', userId); // Do something with the user ID
    } catch (error: any) {
      setError(`Google sign-in failed: '${error.message}'`);
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
            type="password"
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
