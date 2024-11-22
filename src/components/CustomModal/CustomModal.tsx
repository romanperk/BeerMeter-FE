import { Box, Modal, Stack, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { modalStyle } from '../../styles/modalStyle';

interface CustomModalProps {
  t: TFunction<'translation', undefined>;
  open: boolean;
  title: string;
  children: React.ReactNode;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function CustomModal({ children, t, open, title, handleClose, handleSubmit }: CustomModalProps) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column">
            <Typography variant="h5" component="h2" color="text.primary" sx={{ pb: 1 }}>
              {t(`${title}`)}
            </Typography>
            {children}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
