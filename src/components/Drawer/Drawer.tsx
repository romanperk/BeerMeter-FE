import { Drawer } from '@mui/material';
import { DrawerOptions } from './DrawerOptions';

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
}

function CustomDrawer({ open, onClose }: CustomDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerOptions onClose={onClose} />
    </Drawer>
  );
}

export default CustomDrawer;
