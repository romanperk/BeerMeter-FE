import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4">404 - Page Not Found</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 3 }}>
        Go to Home Page
      </Button>
    </Box>
  );
};

export default NotFound;
