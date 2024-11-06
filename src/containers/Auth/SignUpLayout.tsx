import GoogleIcon from '@mui/icons-material/Google';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CssBaseline,
  Divider,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TFunction } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

interface AuthPageProps {
  t: TFunction<'translation', undefined>;
  handleEmailSignUp: (e: React.FormEvent) => Promise<void>;
  handleGoogleSignUp: () => Promise<void>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
  preventShow: (event: React.MouseEvent) => void;
}

export function SignUpLayout({
  t,
  handleEmailSignUp,
  handleGoogleSignUp,
  showPassword,
  handleClickShowPassword,
  preventShow,
}: AuthPageProps) {
  const { register } = useFormContext();
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
        }}
      >
        <Typography variant="h4">{t('authSignUp')}</Typography>
        <Box component="form" onSubmit={handleEmailSignUp} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('authEmailAddress')}
            autoComplete="email"
            autoFocus
            {...register('email', { required: 'Email is required' })}
          />
          <FormControl variant="outlined" fullWidth required>
            <InputLabel htmlFor="password">{t('authPassword')}</InputLabel>
            <OutlinedInput
              id="password"
              label={t('authPassword')}
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={preventShow}
                    onMouseUp={preventShow}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            {t('authSignUpButton')}
          </Button>

          <Divider sx={{ mt: 3, mb: 3 }}>{t('authOr')}</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ mb: 2 }}
            onClick={handleGoogleSignUp}
          >
            {t('authSignUpGoogleButton')}
          </Button>
        </Box>

        <Button variant="text" onClick={() => navigate('/login')}>
          {t('authHaveAccountButton')}
        </Button>
      </Box>
    </Container>
  );
}
