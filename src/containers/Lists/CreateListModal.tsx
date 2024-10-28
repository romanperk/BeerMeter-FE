import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { modalStyle } from '../../styles/modalStyle';
import { UseFormRegister } from 'react-hook-form';
import { PlaceTypeSelect } from '../../components/PlaceTypeSelect/PlaceTypeSelect';

interface CreateListModalProps {
  t: TFunction<'translation', undefined>;
  open: boolean;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<{ searchQuery: string; place: string; type: string }>;
}

export function CreateListModal({ t, open, handleClose, handleSubmit, register }: CreateListModalProps) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column">
            <Typography variant="h5" component="h2" color="text.primary" sx={{ pb: 1 }}>
              {t('placeSetName')}
            </Typography>

            <TextField fullWidth label={t('placeName')} variant="outlined" required {...register('place')} />
            <PlaceTypeSelect t={t} register={register} />

            <Stack spacing={2} direction="row" sx={{ pt: 1 }}>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="inherit"
                sx={{
                  width: 180,
                  borderRadius: 2,
                  color: 'text.primary',
                }}
              >
                {t('placeCancelChangesButton')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: 180,
                  borderRadius: 2,
                }}
              >
                {t('placeSaveChangesButton')}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}