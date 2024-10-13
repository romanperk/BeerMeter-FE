import { Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { User } from 'firebase/auth';
import { DrawerOptions } from '../Drawer/DrawerOptions';
import { TFunction } from 'i18next';

interface AppBarDrawerProps {
  toggleDrawer: (newOpen: boolean) => () => void;
  open: boolean;
  user: User | null;
  t: TFunction<'translation', undefined>;
}

export function AppBarDrawer({ user, toggleDrawer, open, t }: AppBarDrawerProps) {
  return (
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
          !user && { display: 'none' },
        ]}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerOptions t={t} onClose={toggleDrawer(false)} />
      </Drawer>
    </Box>
  );
}
