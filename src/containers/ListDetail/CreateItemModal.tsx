import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Dialog,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { TFunction } from 'i18next';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ItemTypeSelect } from '../../components/SelectComponents/ItemTypeSelect';
import { isItemBeverage } from './helpers/isItemBeverage';
import { ItemSizeSelect } from '../../components/SelectComponents/ItemSizeSelect';

interface CreateItemModalProps {
  t: TFunction<'translation', undefined>;
  open: boolean;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<{
    type: string;
    name: string;
    size: number;
    amount: number;
    price: string;
  }>;
  watch: UseFormWatch<{
    type: string;
    name: string;
    size: number;
    amount: number;
    price: string;
  }>;
}

export function CreateItemModal({
  t,
  open,
  handleClose,
  handleSubmit,
  register,
  watch,
}: CreateItemModalProps) {
  const isBeer = isItemBeverage(watch('type'));

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column">
            <Typography variant="h5" component="h2" color="text.primary" sx={{ pb: 1 }}>
              {t('itemCreateHeader')}
            </Typography>

            <TextField fullWidth label={t('itemName')} variant="outlined" required {...register('name')} />
            <ItemTypeSelect t={t} register={register} />
            {isBeer && <ItemSizeSelect t={t} register={register} />}
            <FormControl>
              <InputLabel>{t('itemAmount')}</InputLabel>
              <OutlinedInput
                fullWidth
                required
                type="number"
                label={t('itemAmount')}
                {...register('amount')}
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel>{t('itemPrice')}</InputLabel>
              <OutlinedInput fullWidth required type="number" label={t('itemPrice')} {...register('price')} />
            </FormControl>

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
    </Dialog>
  );
}
