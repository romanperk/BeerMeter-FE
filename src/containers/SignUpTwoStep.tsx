import { Button, TextField, Typography, Container, Box, CssBaseline } from '@mui/material';
import { TFunction } from 'i18next';
// import { FavTypeSelect } from '../components/Profile/FavTypeSelect';
// import { useNavigate } from 'react-router-dom';
// import { useUpdateUserMutation } from '../redux/users/userRtk';
// import { useFetchUser } from '../helpers/fetchUser';

interface AuthPageProps {
  t: TFunction<'translation', undefined>;
  error: string;
  // favDrink: string;
  // handleChange: (event: SelectChangeEvent) => void;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpTwoStep({
  t,
  error,
  // favDrink,
  // handleChange,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}: AuthPageProps) {
  // const navigate = useNavigate();
  // const [updateUser] = useUpdateUserMutation();
  // const { user } = useFetchUser();
  // const uid = user?.uid || '';

  // const handleSetUp = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   await updateUser({
  //     uid,
  //     firstName,
  //     lastName,
  //     favDrink,
  //   }).unwrap();
  //   navigate('/');
  // };

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
        {/* <Box component="form" onSubmit={handleSetUp}> */}
        <TextField
          required
          fullWidth
          id="firstName"
          label={t('userFirstName')}
          name="firstName"
          autoComplete="firstName"
          autoFocus
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          required
          fullWidth
          id="lastName"
          label={t('userLastName')}
          name="lastName"
          autoComplete="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Typography>
        )}
        {/* <FavTypeSelect t={t} favDrink={favDrink} handleChange={handleChange} /> */}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          {t('authCompleteSetUpButton')}
        </Button>
      </Box>
      {/* </Box> */}
    </Container>
  );
}
