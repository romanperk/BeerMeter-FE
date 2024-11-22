import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TFunction } from 'i18next';
import { UseFormRegister } from 'react-hook-form';

interface ItemSizeSelectProps {
  t: TFunction<'translation', undefined>;
  register: UseFormRegister<{
    type: string;
    name: string;
    size: number;
    amount: number;
    price: string;
  }>;
}

export function ItemSizeSelect({ t, register }: ItemSizeSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-amount-type-label">{t('itemSize')}</InputLabel>
      <Select
        id="select-amount-type"
        label={t('itemSize')}
        {...register('size')}
        labelId="select-amount-type-label"
        fullWidth
        defaultValue={''}
      >
        <MenuItem value={0.3}>0.3</MenuItem>
        <MenuItem value={0.4}>0.4</MenuItem>
        <MenuItem value={0.5}>0.5</MenuItem>
        <MenuItem value="Pint">Pint</MenuItem>
        <MenuItem value={0.7}>0.7</MenuItem>
        <MenuItem value={1}>1</MenuItem>
      </Select>
    </FormControl>
  );
}
