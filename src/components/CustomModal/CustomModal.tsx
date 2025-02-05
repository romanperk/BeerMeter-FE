import { Box, Button, Dialog, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface CustomModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function CustomModal({ children, open, title, handleClose, handleSubmit }: CustomModalProps) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Box>
          <Typography variant="h5" component="h2" color="text.primary" sx={{ pb: 1 }}>
            {t(`${title}`)}
          </Typography>
          {children}
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button fullWidth variant="outlined" color="primary" onClick={handleClose}>
              {t('modalCancel')}
            </Button>
            <Button fullWidth variant="contained" color="primary" type="submit">
              {t('modalSubmit')}
            </Button>
          </Stack>
        </Box>
      </form>
    </Dialog>
  );
}
