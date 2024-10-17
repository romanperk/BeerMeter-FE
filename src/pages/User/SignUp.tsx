import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useTranslation } from 'react-i18next';
import { SignUpLayout } from '../../containers/Auth/SignUpLayout';
import { SignUpTwoStep } from '../../containers/Auth/SignUpTwoStep';
import { useCreateUserMutation } from '../../redux/users/userRtk';
import { useForm, FormProvider } from 'react-hook-form';

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  favDrink: string;
}

const SignUp = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [createUser] = useCreateUserMutation();

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      favDrink: 'Beer',
    },
  });

  const { handleSubmit } = methods;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleEmailSignUp = async (data: any) => {
    const { email, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUser({
        email: userCredential.user.email!,
        uid: userCredential.user.uid,
      }).unwrap();
      setStep(2);
      // snackBarSuccess
    } catch {
      // snackBarError
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await createUser({
        email: userCredential.user.email!,
        uid: userCredential.user.uid,
      }).unwrap();
      setStep(2);
      // snackBarSuccess
    } catch {
      // snackBarError
    }
  };

  return (
    <FormProvider {...methods}>
      {step === 1 && (
        <SignUpLayout
          t={t}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          preventShow={(event) => {
            event.preventDefault();
          }}
          handleEmailSignUp={handleSubmit(handleEmailSignUp)}
          handleGoogleSignUp={handleGoogleSignUp}
        />
      )}
      {step === 2 && <SignUpTwoStep t={t} />}
    </FormProvider>
  );
};

export default SignUp;
