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
        backgroundImage: 'url(landing_page.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '30vh', sm: '45vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2, m: 3 }}>
        <Typography variant={downMd ? 'h5' : 'h3'} sx={{ fontWeight: 'bold' }}>
          BeerMeter
        </Typography>
        <Typography variant={downMd ? 'h6' : 'h5'} sx={{ mb: 3 }}>
          Track, Save, and Share Your Pub Adventures
        </Typography>
        <Button
          size={downMd ? 'small' : undefined}
          variant="contained"
          color="inherit"
          sx={{ mr: 2, color: 'text.primary' }}
          onClick={() => navigate('/signup')}
        >
          Get Started Now
        </Button>
        <Button
          size={downMd ? 'small' : undefined}
          variant="outlined"
          color="inherit"
          onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
        >
          How It Works
        </Button>
      </Box>
    </Box>
  );
}
