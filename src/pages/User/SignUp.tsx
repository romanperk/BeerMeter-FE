import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useTranslation } from 'react-i18next';
import { SignUpLayout } from '../../components/Auth/SignUpLayout';
import { SignUpTwoStep } from '../../containers/SignUpTwoStep';
// import { SelectChangeEvent } from '@mui/material';
import { useCreateUserMutation } from '../../redux/users/userRtk';

const SignUp = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  // const [favDrink, setFavDrink] = useState('');
  const [createUser] = useCreateUserMutation();

  // const handleChange = (event: SelectChangeEvent) => {
  //   setFavDrink(event.target.value as string);
  // };

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUser({
        email: userCredential.user.email!,
        uid: userCredential.user.uid,
      }).unwrap();
      setStep(2);
    } catch {
      setError(`Authentication failed. Check your credentials.`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await createUser({
        email: userCredential.user.email!,
        uid: userCredential.user.uid,
      }).unwrap();
      setStep(2);
    } catch {
      setError(`Google sign-in failed`);
    }
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
          // favDrink={favDrink}
          // handleChange={handleChange}
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
