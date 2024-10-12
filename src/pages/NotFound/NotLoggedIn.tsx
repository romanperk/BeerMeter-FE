import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotLoggedIn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4">404 - Page Not Found</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Sorry, you have to be logged in in order to view the website.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/auth')} sx={{ mt: 3 }}>
        Go to Login
      </Button>
    </Box>
  );
};

export default NotLoggedIn;
