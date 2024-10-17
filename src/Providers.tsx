import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { createTheme, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from './helpers/providers/SnackbarProvider';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}
