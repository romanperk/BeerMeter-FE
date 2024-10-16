import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { createUser, updateUserInfo } from '../../services/users/userFunctions';
import { auth } from '../../services/firebase';
import { useTranslation } from 'react-i18next';
import { SignUpLayout } from '../../components/Auth/SignUpLayout';
import { SignUpTwoStep } from '../../containers/SignUpTwoStep';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [favDrink, setFavDrink] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFavDrink(event.target.value as string);
  };

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
      await createUserWithEmailAndPassword(auth, email, password);
      await createUser(email);
      setStep(2);
    } catch {
      setError(`Authentication failed. Check your credentials.`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const email = userCredential.user.email!;
      await createUser(email);
      setStep(2);
    } catch {
      setError(`Google sign-in failed`);
    }
  };

  const handleSetUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateUserInfo(email, firstName, lastName, favDrink);
    navigate('/');
  };

  return (
    <>
      {step === 1 && (
        <SignUpLayout
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
      )}
      {step === 2 && (
        <SignUpTwoStep
          t={t}
          error={error}
          favDrink={favDrink}
          handleChange={handleChange}
          handleSetUp={handleSetUp}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
        />
      )}
    </>
  );
};

export default SignUp;
