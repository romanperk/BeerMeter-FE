import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BeerList from './pages/BeerList';
import Auth from './pages/Auth';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">BeerMeter</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beerlist" element={<BeerList />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
