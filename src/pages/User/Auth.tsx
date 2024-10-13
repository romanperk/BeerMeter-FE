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
import { AuthLayout } from '../../components/Auth/AuthLayout';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
    <AuthLayout
      t={t}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      handleMouseUpPassword={handleMouseUpPassword}
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
