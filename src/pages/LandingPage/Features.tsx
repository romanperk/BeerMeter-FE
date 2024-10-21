import { Box, Container, Typography } from '@mui/material';

export function Features() {
  return (
    <Box sx={{ p: 4, color: 'text.primary' }}>
      <Container>
        <Typography variant="h4" textAlign="center" sx={{ mb: 6 }}>
          Why BeerMeter?
        </Typography>
        <Typography variant="h5" gutterBottom>
          Real-Time Spend Tracking
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Record your expenses instantly, even while enjoying your drink.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Group Collaboration
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Join forces with your friends to create shared lists of spendings.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Notifications & Bill Splitting
        </Typography>
        <Typography variant="body1">
          Get reminders and split the bill easily – no more awkward calculations.
        </Typography>
      </Container>
    </Box>
  );
}
