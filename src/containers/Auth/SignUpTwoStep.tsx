import { Button, TextField, Typography, Container, Box, CssBaseline } from '@mui/material';
import { TFunction } from 'i18next';
import { FavTypeSelect } from '../../components/FavTypeSelect/FavTypeSelect';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from '../../redux/users/userRtk';
import { useFetchUser } from '../../helpers/functions/fetchUser';
import { useFormContext } from 'react-hook-form';
import { SignUpFormData } from '../../pages/User/SignUp';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/users/authSlice';

interface AuthPageProps {
  t: TFunction<'translation', undefined>;
}

export function SignUpTwoStep({ t }: AuthPageProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const { user, refetchUser } = useFetchUser();
  const uid = user?.uid || '';
  const { register, handleSubmit } = useFormContext<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    await updateUser({
      uid,
      firstName: data.firstName,
      lastName: data.lastName,
      favDrink: data.favDrink,
    }).unwrap();
    dispatch(
      login({
        uid: user?.uid,
        email: user?.email,
      })
    );
    refetchUser();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">{t('authSetUpAccount')}</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            id="firstName"
            label={t('userFirstName')}
            autoComplete="firstName"
            autoFocus
            {...register('firstName', { required: 'First name is required' })}
            sx={{ mt: 2 }}
          />
          <TextField
            required
            fullWidth
            id="lastName"
            label={t('userLastName')}
            autoComplete="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            sx={{ mt: 2, mb: 2 }}
          />
          <FavTypeSelect t={t} register={register} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            {t('authCompleteSetUpButton')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
