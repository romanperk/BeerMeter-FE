import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Slide, useColorScheme } from '@mui/material';
import SportsBarRoundedIcon from '@mui/icons-material/SportsBarRounded';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { AppBarDrawer } from './AppBarDrawer';
import { AppBarAppName } from './AppBarAppName';
import { AppBarTheme } from './AppBarTheme';
import { AppBarLang } from './AppBarLang';
import { logout } from '../../redux/users/authSlice';
import { useDispatch } from 'react-redux';
import { AppBarUserMenu } from './AppBarUserMenu';
import { useFetchUser } from '../../helpers/functions/fetchUser';
import { useShowSnackbar } from '../../helpers/functions/showSnackBar';
import { Session } from '@supabase/supabase-js';
import supabase from '../../services/supabase';

interface CustomAppBarProps {
  authState: Session | null;
}

export function CustomAppBar({ authState }: CustomAppBarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackBarSuccess } = useShowSnackbar();
  const { user: loadedUser } = useFetchUser();
  const { t, i18n } = useTranslation();
  const { mode, setMode } = useColorScheme();
  const [language, setLanguage] = useState(i18n.language);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showAppBar, setShowAppBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setShowAppBar(true);
      } else if (currentScrollY > scrollY) {
        setShowAppBar(false);
      } else {
        setShowAppBar(true);
      }
      setScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

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
      await supabase.auth.signOut();
      dispatch(logout());
      navigate('/login');
      setAnchorElUser(null);
      showSnackBarSuccess(t('authLogOutSuccess'));
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <Slide appear={false} direction="down" in={showAppBar}>
      <AppBar color="inherit">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <AppBarDrawer t={t} authState={authState} open={drawerOpen} toggleDrawer={toggleDrawer} />
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
              authState={authState}
              user={loadedUser}
              anchorEl={anchorElUser}
              handleOpen={handleOpenUserMenu}
              handleLogout={handleLogout}
              handleNavigateUser={handleNavigateUser}
              handleClose={() => setAnchorElUser(null)}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
