import { useMediaQuery, useTheme } from '@mui/material';

export function useBreakpoints() {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  return { downSm, downMd };
}
