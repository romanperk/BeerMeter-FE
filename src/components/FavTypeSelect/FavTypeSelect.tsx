import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TFunction } from 'i18next';
import { UseFormRegister } from 'react-hook-form';

interface FavTypeSelectProps {
  t: TFunction<'translation', undefined>;
  register: UseFormRegister<{ firstName: string; lastName: string; favDrink: string }>;
}

export function FavTypeSelect({ t, register }: FavTypeSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-type-label">{t('userFavDrink')}</InputLabel>
      <Select
        id="select-favorite-drink"
        label={t('userFavDrink')}
        {...register('favDrink')}
        labelId="select-type-label"
        fullWidth
        defaultValue={''}
      >
        <MenuItem value="">{t('userSelectUndefined')}</MenuItem>
        <MenuItem value="Beer">{t('userSelectBeer')}</MenuItem>
        <MenuItem value="Drinks">{t('userSelectDrinks')}</MenuItem>
        <MenuItem value="Shots">{t('userSelectShots')}</MenuItem>
      </Select>
    </FormControl>
  );
}
