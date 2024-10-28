import { LoginLayout } from '../../containers/Auth/LoginLayout';
import { FormProvider } from 'react-hook-form';
import { useHelpers } from './helpers';
import { useEffect } from 'react';
import supabase from '../../services/supabase';

const Login = () => {
  const {
    t,
    navigate,
    signInMethods,
    showPassword,
    handleClickShowPassword,
    preventShow,
    handleEmailSignIn,
    handleGoogleSignIn,
  } = useHelpers();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <FormProvider {...signInMethods}>
      <LoginLayout
        t={t}
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        preventShow={preventShow}
        handleEmailSignIn={signInMethods.handleSubmit(handleEmailSignIn)}
        handleGoogleSignIn={handleGoogleSignIn}
      />
    </FormProvider>
  );
};

export default Login;
