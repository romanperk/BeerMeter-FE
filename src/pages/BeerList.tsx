import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const BeerList: React.FC = () => {
  const beers = [
    { name: 'Sample Beer 1', description: 'A refreshing lager.' },
    { name: 'Sample Beer 2', description: 'A hoppy IPA.' },
  ];

  return (
    <Grid container spacing={2}>
      {beers.map((beer, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h5">{beer.name}</Typography>
              <Typography color="textSecondary">{beer.description}</Typography>
              <Button variant="contained" color="primary">
                Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BeerList;
