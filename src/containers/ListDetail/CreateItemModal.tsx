import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { modalStyle } from '../../styles/modalStyle';
import { UseFormRegister } from 'react-hook-form';
import { ItemTypeSelect } from '../../components/ItemTypeSelect/ItemTypeSelect';

interface CreateItemModalProps {
  t: TFunction<'translation', undefined>;
  open: boolean;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<{
    name: string;
    type: string;
    size: string;
    amount: number;
    price: string;
  }>;
}

export function CreateItemModal({ t, open, handleClose, handleSubmit, register }: CreateItemModalProps) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column">
            <Typography variant="h5" component="h2" color="text.primary" sx={{ pb: 1 }}>
              {t('itemCreateHeader')}
            </Typography>

            <TextField fullWidth label={t('itemName')} variant="outlined" required {...register('name')} />
            <ItemTypeSelect t={t} register={register} />
            <TextField fullWidth label={t('itemSize')} variant="outlined" required {...register('size')} />
            <TextField
              fullWidth
              label={t('itemAmount')}
              variant="outlined"
              required
              {...register('amount')}
            />
            <TextField fullWidth label={t('itemPrice')} variant="outlined" required {...register('price')} />

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
