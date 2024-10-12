import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to BeerMeter!
      </Typography>

      <Typography variant="h5" component="p" sx={{ mt: 2 }}>
        Discover and share your favorite beers and drinks.
      </Typography>

      <Typography variant="body1" component="p" sx={{ mt: 3, maxWidth: '600px', mx: 'auto' }}>
        With BeerMeter, you can create personalized beer lists, track your favorite brews, and share them with
        friends. Whether you're a casual beer enthusiast or a connoisseur, BeerMeter is the perfect app to
        explore new drinks and enjoy them together.
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/beerlist')}>
            View My Beer List
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" size="large" onClick={() => navigate('/profile')}>
            Manage Account
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
