import React from 'react';
import BeerList from '../components/BeerList/BeerList';
import { Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <h1>Welcome to BeerMeter</h1>
      <BeerList />
    </Box>
  );
};

export default Home;
