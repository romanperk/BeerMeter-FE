import { Box, Button, Typography } from '@mui/material';
import { NavigateFunction } from 'react-router-dom';

export function LandingEnding({ navigate }: { navigate: NavigateFunction }) {
  return (
    <>
      <Box sx={{ textAlign: 'center', p: 4, backgroundColor: 'background.default' }}>
        <Typography variant="h5" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Start tracking your pub spendings with BeerMeter today!
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/signup')}>
          Sign Up for Free
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'background.default', color: 'text.primary' }}>
        <Typography variant="body2">© {new Date().getFullYear()} BeerMeter. All rights reserved.</Typography>
        <Typography variant="caption">
          Drink responsibly and always track your spending with BeerMeter!
        </Typography>
      </Box>
    </>
  );
}
