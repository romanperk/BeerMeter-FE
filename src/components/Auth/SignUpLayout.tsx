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

interface AuthPageProps {
  t: TFunction<'translation', undefined>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  handleAuth: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMouseUpPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function SignUpLayout({
  t,
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleAuth,
  handleGoogleSignIn,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleMouseUpPassword,
}: AuthPageProps) {
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
        }}
      >
        <Typography variant="h4">{t('authSignUp')}</Typography>
        <Box component="form" onSubmit={handleAuth} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('authEmailAddress')}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth required>
            <InputLabel htmlFor="password">{t('authPassword')}</InputLabel>
            <OutlinedInput
              id="password"
              label={t('authPassword')}
              type={showPassword ? 'text' : 'password'}
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {error && (
            <Typography color="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            {t('authSignUpButton')}
          </Button>

          <Divider sx={{ mt: 3, mb: 3 }}>{t('authOr')}</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ mb: 2 }}
            onClick={handleGoogleSignIn}
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
