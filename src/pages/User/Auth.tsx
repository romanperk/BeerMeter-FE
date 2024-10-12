import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/users/authSlice';
import { useNavigate } from 'react-router-dom';
import AuthPage from '../../components/Auth/Auth';

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
    <AuthPage
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      setIsLogin={setIsLogin}
      isLogin={isLogin}
      error={error}
      handleAuth={handleAuth}
      handleGoogleSignIn={handleGoogleSignIn}
    />
  );
};

export default Auth;
