import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4">{t('pageNotFound')}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {t('pageNotFoundText')}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 3 }}>
        {t('pageNotFoundGoHomeButton')}
      </Button>
    </Box>
  );
};

export default NotFound;
