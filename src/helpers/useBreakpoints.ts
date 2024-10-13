import { useMediaQuery, useTheme } from '@mui/material';

export function useBreakpoints() {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  return { downSm };
}
