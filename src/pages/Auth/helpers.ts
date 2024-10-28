import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useShowSnackbar } from '../../helpers/functions/showSnackBar';
import { useForm } from 'react-hook-form';
import { IEmailLayout } from '../../redux/users/userSlice';
import supabase from '../../services/supabase';

export function useHelpers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackBarError } = useShowSnackbar();
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        showSnackBarError(error.message);
        throw new Error();
      }
    } catch (error) {
      showSnackBarError(error as string);
    }
  };

  const handleEmailSignUp = async (data: IEmailLayout) => {
    const { email, password } = data;
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        showSnackBarError(error.message);
        throw new Error();
      }
    } catch (error) {
      showSnackBarError(error as string);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) {
        showSnackBarError(error.message);
        throw new Error();
      }
    } catch (error) {
      showSnackBarError(error as string);
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
