import { Box, CircularProgress, Typography } from '@mui/material';

export function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ ml: 2, color: 'text.primary' }}>
        Loading...
      </Typography>
    </Box>
  );
}
