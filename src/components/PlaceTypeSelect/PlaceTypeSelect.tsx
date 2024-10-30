import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TFunction } from 'i18next';
import { UseFormRegister } from 'react-hook-form';

interface PlaceTypeSelectProps {
  t: TFunction<'translation', undefined>;
  register: UseFormRegister<{ searchQuery: string; place: string; type: string }>;
}

export function PlaceTypeSelect({ t, register }: PlaceTypeSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-place-type">{t('placeSelect')}</InputLabel>
      <Select
        id="select-favorite-drink"
        label={t('placeSelect')}
        {...register('type')}
        labelId="select-place-type"
        fullWidth
        defaultValue={''}
      >
        <MenuItem value="">{t('placeSelectUndefined')}</MenuItem>
        <MenuItem value="Pub">{t('placeSelectPub')}</MenuItem>
        <MenuItem value="Restaurant">{t('placeSelectRestaurant')}</MenuItem>
        <MenuItem value="Bar">{t('placeSelectBar')}</MenuItem>
        <MenuItem value="Club">{t('placeSelectClub')}</MenuItem>
      </Select>
    </FormControl>
  );
}
