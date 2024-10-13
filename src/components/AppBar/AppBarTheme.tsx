import { Box, IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { TFunction } from 'i18next';

interface AppBarThemeProps {
  t: TFunction<'translation', undefined>;
  toggleTheme: () => void;
  mode: 'light' | 'dark' | 'system';
}

export function AppBarTheme({ t, mode, toggleTheme }: AppBarThemeProps) {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={mode === 'light' ? t('darkMode') : t('lightMode')}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleTheme}
          edge="start"
          sx={[
            {
              mr: 2,
            },
          ]}
        >
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
