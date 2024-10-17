import { Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DrawerOptions } from '../Drawer/DrawerOptions';
import { TFunction } from 'i18next';
import { User } from 'firebase/auth';

interface AppBarDrawerProps {
  toggleDrawer: (newOpen: boolean) => () => void;
  open: boolean;
  authState: User | null;
  t: TFunction<'translation', undefined>;
}

export function AppBarDrawer({ authState, toggleDrawer, open, t }: AppBarDrawerProps) {
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
          !authState && { display: 'none' },
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
