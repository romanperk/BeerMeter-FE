import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TFunction } from 'i18next';
import { UseFormRegister } from 'react-hook-form';

interface ItemTypeSelectProps {
  t: TFunction<'translation', undefined>;
  register: UseFormRegister<{
    name: string;
    type: string;
    size: string;
    amount: number;
    price: string;
  }>;
}

export function ItemTypeSelect({ t, register }: ItemTypeSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-item-type-label">{t('itemType')}</InputLabel>
      <Select
        id="select-item-type"
        label={t('itemType')}
        {...register('type')}
        labelId="select-item-type-label"
        fullWidth
        defaultValue={''}
      >
        <MenuItem value="Beer">{t('itemSelectTypeBeer')}</MenuItem>
        <MenuItem value="Drink">{t('itemSelectTypeDrink')}</MenuItem>
        <MenuItem value="Shot">{t('itemSelectTypeShot')}</MenuItem>
        <MenuItem value="Food">{t('itemSelectTypeFood')}</MenuItem>
        <MenuItem value="NonAlco">{t('itemSelectTypeNonAlco')}</MenuItem>
      </Select>
    </FormControl>
  );
}
