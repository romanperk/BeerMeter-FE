import { Box, Typography, Button, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmailConfirmation = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/login');
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
        <Typography variant="h4" gutterBottom>
          Check your email
        </Typography>
        <Typography align="center" variant="body1" pb={3}>
          A confirmation link has been sent to your email address. Please check your inbox (or spam folder)
          and confirm your email to continue.
        </Typography>
        <Button variant="contained" onClick={handleNavigateHome}>
          Go back to Login page
        </Button>
      </Box>
    </Container>
  );
};

export default EmailConfirmation;
