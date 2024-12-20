import { Button, TextField, Typography, Container, Box, CssBaseline } from '@mui/material';
import { FavTypeSelect } from '../../components/SelectComponents/FavTypeSelect';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from '../../redux/users/userRtk';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserId } from '../../redux/users/userSelectors';

export interface SetUpProfileFormProps {
  firstName: string;
  lastName: string;
  favDrink: string;
}

export function SetUpProfile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [updateUser] = useUpdateUserMutation();
  const userId = useSelector(getUserId)!;

  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      favDrink: '',
    },
  });

  const onSubmit = async (data: SetUpProfileFormProps) => {
    await updateUser({
      userId,
      ...data,
    }).unwrap();
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
            sx={{ mt: 2 }}
            {...register('firstName')}
          />
          <TextField
            required
            fullWidth
            id="lastName"
            label={t('userLastName')}
            autoComplete="lastName"
            sx={{ mt: 2, mb: 2 }}
            {...register('lastName')}
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
