import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/users/authSlice';
import { useNavigate } from 'react-router-dom';
import { LoginLayout } from '../../components/Auth/LoginLayout';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        login({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      navigate(`/`);
    } catch {
      setError(`Authentication failed. Check your credentials.`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      dispatch(
        login({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      navigate(`/`);
    } catch {
      setError(`Google sign-in failed`);
    }
  };

  return (
    <LoginLayout
      t={t}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      handleMouseUpPassword={handleMouseUpPassword}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      handleAuth={handleAuth}
      handleGoogleSignIn={handleGoogleSignIn}
    />
  );
};

export default Login;
