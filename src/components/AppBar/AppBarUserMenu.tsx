import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { IUser } from '../../redux/users/authSlice';

interface AppBarUserMenu {
  t: TFunction<'translation', undefined>;
  anchorEl: HTMLElement | null;
  user: IUser | undefined;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleNavigateUser: (path: string) => void;
  handleLogout: () => Promise<void>;
}

export function AppBarUserMenu({
  t,
  user,
  handleOpen,
  anchorEl,
  handleClose,
  handleNavigateUser,
  handleLogout,
}: AppBarUserMenu) {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={t('openSettings')}>
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          {user ? <Avatar sx={{ bgcolor: '#2196f3' }}>R</Avatar> : <Avatar />}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user ? (
          [
            <MenuItem key="profile" onClick={() => handleNavigateUser('/profile')}>
              <Typography sx={{ textAlign: 'center' }}>{t('profile')}</Typography>
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout}>
              <Typography sx={{ textAlign: 'center' }}>{t('logout')}</Typography>
            </MenuItem>,
          ]
        ) : (
          <MenuItem onClick={() => handleNavigateUser('/login')}>
            <Typography sx={{ textAlign: 'center' }}>{t('appBarLogIn')}</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
