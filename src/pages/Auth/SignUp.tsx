import { SignUpLayout } from '../../containers/Auth/SignUpLayout';
import { FormProvider } from 'react-hook-form';
import { useHelpers } from './helpers';

const SignUp = () => {
  const {
    t,
    signUpMethods,
    showPassword,
    handleClickShowPassword,
    preventShow,
    handleEmailSignUp,
    handleGoogleSignIn,
  } = useHelpers();

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
