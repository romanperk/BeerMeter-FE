import React from 'react';
import BeerList from '../components/BeerList';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to BeerMeter</h1>
      <BeerList />
    </div>
  );
};

export default Home;
