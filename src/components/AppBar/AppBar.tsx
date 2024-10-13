import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useColorScheme } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut, User } from 'firebase/auth';
import { logout } from '../../redux/users/authSlice';
import { auth } from '../../services/firebase';
import { AppBarItems } from './AppBarItems';

interface CustomAppBarProps {
  user: User | null;
}

function CustomAppBar({ user }: CustomAppBarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/auth');
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <AppBarItems
            user={user}
            navigate={navigate}
            mode={mode}
            open={open}
            anchorElUser={anchorElUser}
            handleLogout={handleLogout}
            toggleTheme={toggleTheme}
            toggleDrawer={toggleDrawer}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomAppBar;
