import { Typography, Avatar, Button, Box, Stack } from '@mui/material';
import { Email, Liquor, Today } from '@mui/icons-material';
import { IUser } from '../../redux/users/userSlice';
import { TFunction } from 'i18next';
import { NavigateFunction } from 'react-router-dom';
import { formatDate } from '../../helpers/functions/formatDate';

interface ProfileLayoutProps {
  user: IUser | undefined;
  t: TFunction<'translation', undefined>;
  navigate: NavigateFunction;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProfileLayout({ user, t, navigate, setOpen }: ProfileLayoutProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', m: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', color: 'white', width: 56, height: 56 }}>
          {user?.firstName?.charAt(0) || ''}
        </Avatar>
        <Typography variant="h4" component="h1" mb={3} mt={1}>
        {user?.firstName} {user?.lastName}
        </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <Liquor />
        <Typography variant="body2">
          {t('userFavDrink')}: {user?.favDrink === '' && <strong> {t('userSelectUndefined')}</strong>}
          {user?.favDrink === 'Beer' && <strong> {t('userSelectBeer')}</strong>}
          {user?.favDrink === 'Drinks' && <strong> {t('userSelectDrinks')}</strong>}
          {user?.favDrink === 'Shots' && <strong> {t('userSelectShots')}</strong>}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" mt={1}>
        <Email />
        <Typography variant="body2">
          Email: <strong>{user?.email}</strong>
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" mt={1}>
        <Today />
        <Typography variant="body2">
          {t('userMemberSince')} <strong>{formatDate(user?.createdAt || '')}</strong>
        </Typography>
      </Stack>

      <Stack direction='row' spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" size="large" onClick={() => navigate('/drinkingBuddies')}>
          {t('userFriendsButton')}
        </Button>
        <Button variant="outlined" size="large" onClick={() => setOpen(true)}>
          {t('userEditProfile')}
        </Button>
      </Stack>
    </Box>
  );
}
