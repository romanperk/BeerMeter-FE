import { Typography, Avatar, Button, Stack, Box } from '@mui/material';

import { Email, Liquor, Today } from '@mui/icons-material';
import { IUser } from '../../redux/users/authSlice';
import { TFunction } from 'i18next';
import { NavigateFunction } from 'react-router-dom';

interface ProfileLayoutProps {
  user: IUser | undefined;
  t: TFunction<'translation', undefined>;
  navigate: NavigateFunction;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProfileLayout({ user, t, navigate, setOpen }: ProfileLayoutProps) {
  return (
    <Box
      sx={{
        p: { xs: 0, sm: 3 },
        bgcolor: 'background.default',
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'primary.main', color: 'white', width: 56, height: 56 }}>
          {user?.firstName.charAt(0)}
        </Avatar>
        <Typography variant="h4" component="h1">
          {t('userMyProfile')}
        </Typography>
      </Stack>

      <Typography variant="h6" sx={{ mt: 2 }}>
        {user?.firstName} {user?.lastName}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <Liquor />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {t('userFavDrink')}: {user?.favDrink === 'Beer' && <strong>{t('userSelectBeer')}</strong>}{' '}
          {user?.favDrink === 'Drinks' && <strong>{t('userSelectDrinks')}</strong>}
          {user?.favDrink === 'Shots' && <strong>{t('userSelectShots')}</strong>}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Email />
        <Typography variant="body1" sx={{ mt: 1 }}>
          Email: <strong>{user?.email}</strong>
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Today />
        <Typography variant="body1" sx={{ mt: 1 }}>
          {t('userMemberSince')} <strong>{user?.firstSignIn.split(' ').slice(1, 4).join(' ')}</strong>
        </Typography>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" size="medium" onClick={() => navigate('/drinkingBuddies')}>
          {t('userFriendsButton')}
        </Button>
        <Button variant="outlined" size="medium" onClick={() => setOpen(true)}>
          {t('userEditProfile')}
        </Button>
      </Stack>
    </Box>
  );
}
