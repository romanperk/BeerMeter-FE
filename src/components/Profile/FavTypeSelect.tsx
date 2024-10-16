import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { TFunction } from 'i18next';

interface FavTypeSelectProps {
  t: TFunction<'translation', undefined>;
  favDrink: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export function FavTypeSelect({ t, favDrink, handleChange }: FavTypeSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-type-label">{t('userFavDrink')}</InputLabel>
      <Select
        id="select-favorite-drink"
        value={favDrink}
        label={t('userFavDrink')}
        onChange={handleChange}
        labelId="select-type-label"
        fullWidth
      >
        <MenuItem value={'Beer'}>{t('userSelectBeer')}</MenuItem>
        <MenuItem value={'Drinks'}>{t('userSelectDrinks')}</MenuItem>
        <MenuItem value={'Shots'}>{t('userSelectShots')}</MenuItem>
      </Select>
    </FormControl>
  );
}
