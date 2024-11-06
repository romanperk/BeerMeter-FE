import { Box, Button, Typography } from '@mui/material';
import { NavigateFunction } from 'react-router-dom';

interface HeroSectionProps {
  downMd: boolean;
  navigate: NavigateFunction;
}

export function HeroSection({ downMd, navigate }: HeroSectionProps) {
  return (
    <Box
      sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '30vh', sm: '35vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2, m: 3 }}>
        <Typography variant={'h3'} sx={{ fontWeight: 'bold' }}>
          BeerMeter
        </Typography>
        <Typography variant={'h6'} sx={{ mb: 3 }}>
          Track, Save, and Share Your Pub Adventures
        </Typography>
        <Button
          size={downMd ? 'small' : undefined}
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => navigate('/signup')}
        >
          Get Started Now
        </Button>
        <Button
          size={downMd ? 'small' : undefined}
          variant="outlined"
          onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
        >
          How It Works
        </Button>
      </Box>
    </Box>
  );
}
