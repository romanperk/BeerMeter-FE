import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { TFunction } from 'i18next';

interface AppBarLangProps {
  t: TFunction<'translation', undefined>;
  anchorEl: HTMLElement | null;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
  language: string;
  changeLanguage: (lang: string) => void;
  handleClose: () => void;
}

export function AppBarLang({
  t,
  handleOpen,
  anchorEl,
  language,
  handleClose,
  changeLanguage,
}: AppBarLangProps) {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={t('changeLanguage')}>
        <IconButton
          color="inherit"
          aria-label="change language"
          onClick={handleOpen}
          sx={[
            {
              mr: 3,
            },
          ]}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem selected={language === 'en'} onClick={() => changeLanguage('en')}>
          {t('englishLang')}
        </MenuItem>
        <MenuItem selected={language === 'cs'} onClick={() => changeLanguage('cs')}>
          {t('czechLang')}
        </MenuItem>
      </Menu>
    </Box>
  );
}
