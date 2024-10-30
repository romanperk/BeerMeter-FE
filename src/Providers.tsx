import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { SnackbarProvider } from './helpers/providers/SnackbarProvider';
import { ThemeContextProvider } from './helpers/providers/ThemeContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeContextProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeContextProvider>
      </Provider>
    </BrowserRouter>
  );
}
