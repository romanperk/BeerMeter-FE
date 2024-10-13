import { Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { useBreakpoints } from '../../helpers/useBreakpoints';

interface AppBarAppNameProps {
  t: TFunction<'translation', undefined>;
}

export function AppBarAppName({ t }: AppBarAppNameProps) {
  const { downSm } = useBreakpoints();

  return (
    <Typography
      variant="h5"
      noWrap
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
      {downSm ? '' : t('appName')}
    </Typography>
  );
}
