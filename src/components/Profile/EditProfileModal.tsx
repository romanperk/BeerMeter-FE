import { Box, Button, Modal, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { modalStyle } from '../../styles/modalStyle';
import { FavTypeSelect } from './FavTypeSelect';

interface EditProfileModalProps {
  handleSubmit: (e: React.FormEvent) => void;
  t: TFunction<'translation', undefined>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  handleClose: () => void;
  favDrink: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export function EditProfileModal({
  handleSubmit,
  t,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  open,
  handleClose,
  favDrink,
  handleChange,
}: EditProfileModalProps) {
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label={t('userLastName')}
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <FavTypeSelect t={t} favDrink={favDrink} handleChange={handleChange} />

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
