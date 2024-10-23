import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../../redux/users/userRtk';
import { useShowSnackbar } from '../../helpers/functions/showSnackBar';
import { useForm } from 'react-hook-form';
import { IEmailLayout } from '../../redux/users/authSlice';
import { supabase } from '../../services/supabase';

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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      showSnackBarError(error.message);
      throw new Error();
    }
    navigate(`/`);
    showSnackBarSuccess(t('authSnackBarSuccess'));
  };

  const handleEmailSignUp = async (data: IEmailLayout) => {
    const { email, password } = data;
    try {
      const userCredential = await supabase.auth.signUp({
        email,
        password,
      });
      await createUser({
        email: userCredential.data.user?.email ?? '',
        uid: userCredential.data.user?.id ?? '',
      }).unwrap();
      navigate('/emailConfirmation');
      // snackBarSuccess
    } catch {
      // snackBarError
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const response = await createUser({
        email: session?.user.email ?? '',
        uid: session?.user.id ?? '',
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
