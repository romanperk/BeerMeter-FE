import { Box, Typography, Button } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useTranslation } from 'react-i18next';

export function SuggestEdit() {
  const { t } = useTranslation();
  const handleRedirect = () => {
    window.open('https://beermeter.canny.io/suggestions', '_blank');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        p: 3,
      }}
    >
      <Box
        sx={{
          p: 4,
          maxWidth: 500,
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <RateReviewIcon
          sx={{
            fontSize: 60,
            color: 'primary.main',
            mb: 2,
          }}
        />

        <Typography variant="h4" gutterBottom>
          {t('suggestEditHeader')}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          {t('suggestEditText')}
        </Typography>

        <Button
          variant="contained"
          size="medium"
          onClick={handleRedirect}
          startIcon={<RateReviewIcon />}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          {t('suggestEditBtn')}
        </Button>
      </Box>
    </Box>
  );
}
