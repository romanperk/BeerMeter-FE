import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useColorScheme } from '@mui/material';
import SportsBarRoundedIcon from '@mui/icons-material/SportsBarRounded';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AppBarDrawer } from '../components/AppBar/AppBarDrawer';
import { AppBarAppName } from '../components/AppBar/AppBarAppName';
import { AppBarTheme } from '../components/AppBar/AppBarTheme';
import { AppBarLang } from '../components/AppBar/AppBarLang';
import { auth } from '../services/firebase';
import { logout } from '../redux/users/authSlice';
import { useDispatch } from 'react-redux';
import { AppBarUserMenu } from '../components/AppBar/AppBarUserMenu';
import { IUser } from '../redux/users/authSlice';

interface CustomAppBarProps {
  user: IUser | undefined;
}

export function CustomAppBar({ user }: CustomAppBarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { mode, setMode } = useColorScheme();
  const [language, setLanguage] = useState(i18n.language);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!mode) {
    return null;
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setLangAnchorEl(null);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavigateUser = (path: string) => {
    navigate(path);
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/login');
      setAnchorElUser(null);
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <AppBarDrawer t={t} user={user} open={drawerOpen} toggleDrawer={toggleDrawer} />
          <SportsBarRoundedIcon />
          <AppBarAppName t={t} />
          <AppBarTheme mode={mode} toggleTheme={toggleTheme} t={t} />
          <AppBarLang
            changeLanguage={changeLanguage}
            anchorEl={langAnchorEl}
            t={t}
            handleOpen={handleOpenLangMenu}
            language={language}
            handleClose={() => setLangAnchorEl(null)}
          />
          <AppBarUserMenu
            t={t}
            user={user}
            anchorEl={anchorElUser}
            handleOpen={handleOpenUserMenu}
            handleLogout={handleLogout}
            handleNavigateUser={handleNavigateUser}
            handleClose={() => setAnchorElUser(null)}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
