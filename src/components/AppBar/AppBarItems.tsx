import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import CustomDrawer from '../Drawer/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SportsBarRoundedIcon from '@mui/icons-material/SportsBarRounded';
import { User } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';

interface AppBarOptionsProps {
  toggleDrawer: (newOpen: boolean) => () => void;
  open: boolean;
  toggleTheme: () => void;
  mode: 'light' | 'dark' | 'system';
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  anchorElUser: null | HTMLElement;
  user: User | null;
  handleLogout: () => Promise<void>;
  navigate: NavigateFunction;
}

export function AppBarItems({
  toggleDrawer,
  open,
  toggleTheme,
  mode,
  handleOpenUserMenu,
  handleCloseUserMenu,
  anchorElUser,
  user,
  handleLogout,
  navigate,
}: AppBarOptionsProps) {
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
          sx={[
            {
              mr: 2,
            },
            open && { display: 'none' },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <CustomDrawer open={open} onClose={toggleDrawer(false)} />
      </Box>
      <SportsBarRoundedIcon />
      <Typography
        variant="h5"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: 'flex',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          paddingLeft: '20px',
          flexGrow: 1,
        }}
      >
        BeerMeter
      </Typography>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Change mode">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleTheme}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Roman Perk" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {user ? (
            [
              <MenuItem key="profile" onClick={() => navigate('/profile')}>
                <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
              </MenuItem>,
              <MenuItem key="settings" onClick={() => navigate('/profileSettings')}>
                <Typography sx={{ textAlign: 'center' }}>Settings</Typography>
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                <Typography sx={{ textAlign: 'center' }}>Log out</Typography>
              </MenuItem>,
            ]
          ) : (
            <MenuItem onClick={() => navigate('/auth')}>
              <Typography sx={{ textAlign: 'center' }}>Log in</Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </>
  );
}
