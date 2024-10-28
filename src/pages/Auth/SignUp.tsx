import { SignUpLayout } from '../../containers/Auth/SignUpLayout';
import { FormProvider } from 'react-hook-form';
import { useHelpers } from './helpers';
import { useEffect } from 'react';
import supabase from '../../services/supabase';

const SignUp = () => {
  const {
    t,
    navigate,
    signUpMethods,
    showPassword,
    handleClickShowPassword,
    preventShow,
    handleEmailSignUp,
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
    <FormProvider {...signUpMethods}>
      <SignUpLayout
        t={t}
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        preventShow={preventShow}
        handleEmailSignUp={signUpMethods.handleSubmit(handleEmailSignUp)}
        handleGoogleSignUp={handleGoogleSignIn}
      />
    </FormProvider>
  );
};

export default SignUp;
