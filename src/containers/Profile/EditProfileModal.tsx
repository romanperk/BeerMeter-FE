import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { modalStyle } from '../../styles/modalStyle';
import { UseFormRegister } from 'react-hook-form';
import { FavTypeSelect } from '../../components/SelectComponents/FavTypeSelect';

interface EditProfileModalProps {
  t: TFunction<'translation', undefined>;
  open: boolean;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<{
    firstName: string;
    lastName: string;
    favDrink: string;
  }>;
}

export function EditProfileModal({ t, open, handleClose, handleSubmit, register }: EditProfileModalProps) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column">
            <Typography variant="h5" component="h2" color="text.primary" sx={{ pb: 1 }}>
              {t('userEditProfile')}
            </Typography>

            <TextField
              fullWidth
              label={t('userFirstName')}
              variant="outlined"
              required
              {...register('firstName')}
            />
            <TextField
              fullWidth
              label={t('userLastName')}
              variant="outlined"
              required
              {...register('lastName')}
            />
            <FavTypeSelect t={t} register={register} />

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
                {t('userCancelChangesButton')}
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
                {t('userSaveChangesButton')}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
