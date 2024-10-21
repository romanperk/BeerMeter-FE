import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBreakpoints } from '../../helpers/functions/useBreakpoints';
import { HeroSection } from './HeroSection';
import { HowItWorks } from './HowItWorks';
import { Features } from './Features';
import { UserRefs } from './UserRefs';
import { LandingEnding } from './LandingEnding';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { downMd } = useBreakpoints();

  return (
    <Box>
      <HeroSection navigate={navigate} downMd={downMd} />
      <HowItWorks downMd={downMd} />
      <Features />
      <UserRefs />
      <LandingEnding navigate={navigate} />
    </Box>
  );
};

export default LandingPage;
