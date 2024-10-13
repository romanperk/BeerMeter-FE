import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t('welcome1')}
      </Typography>

      <Typography variant="h5" component="p" sx={{ mt: 2 }}>
        {t('welcome2')}
      </Typography>

      <Typography variant="body1" component="p" sx={{ mt: 3, maxWidth: '600px', mx: 'auto' }}>
        {t('welcome3')}
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/lists')}>
            {t('welViewbeerListsButton')}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" size="large" onClick={() => navigate('/profile')}>
            {t('welManageAccountButton')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
