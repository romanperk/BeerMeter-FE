import { LoginLayout } from '../../containers/Auth/LoginLayout';
import { FormProvider } from 'react-hook-form';
import { useHelpers } from './helpers';

const Login = () => {
  const {
    t,
    signInMethods,
    showPassword,
    handleClickShowPassword,
    preventShow,
    handleEmailSignIn,
    handleGoogleSignIn,
  } = useHelpers();

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
