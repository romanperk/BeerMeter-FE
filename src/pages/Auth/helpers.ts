import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../../redux/users/userRtk';
import { useShowSnackbar } from '../../helpers/functions/showSnackBar';
import { useForm } from 'react-hook-form';
import { IEmailLayout } from '../../redux/users/authSlice';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../services/firebase';

export function useHelpers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [createUser] = useCreateUserMutation();
  const { showSnackBarError, showSnackBarSuccess } = useShowSnackbar();
  const signInMethods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const signUpMethods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const email = signInMethods.watch('email');
  const password = signInMethods.watch('password');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const preventShow = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(`/`);
      showSnackBarSuccess(t('authSnackBarSuccess'));
    } catch {
      showSnackBarError(t('authSnackBarError'));
    }
  };

  const handleEmailSignUp = async (data: IEmailLayout) => {
    const { email, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUser({
        email: userCredential.user.email!,
        uid: userCredential.user.uid,
      }).unwrap();
      navigate('/setUp');
      // snackBarSuccess
    } catch {
      // snackBarError
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const response = await createUser({
        email: user.email!,
        uid: user.uid,
      }).unwrap();

      if (response.isNewUser) {
        showSnackBarSuccess('Welcome to BeerMeeter! Let’s get the party started! 🍻');
        navigate('/setUp');
      } else {
        showSnackBarSuccess('Welcome back! Ready for another round? 🍺');
        navigate(`/`);
      }
    } catch {
      showSnackBarError('Authentication failed. Please try again!');
    }
  };

  return {
    t,
    signInMethods,
    signUpMethods,
    navigate,
    showPassword,
    handleClickShowPassword,
    preventShow,
    handleEmailSignIn,
    handleGoogleSignIn,
    handleEmailSignUp,
  };
}
