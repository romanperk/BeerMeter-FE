import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotLoggedIn: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4">{t('pageNotFound')}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {t('pageNotFoundText2')}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/auth')} sx={{ mt: 3 }}>
        {t('pageNotFoundGoLoginButton')}
      </Button>
    </Box>
  );
};

export default NotLoggedIn;
