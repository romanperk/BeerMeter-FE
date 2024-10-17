import React, { createContext, useState, ReactNode, SyntheticEvent } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { Alert, AlertColor, useTheme } from '@mui/material';

interface SnackbarContextProps {
  showSnackBarError: (message: string) => void;
  showSnackBarSuccess: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'error',
  });

  const showSnackBarError = (message: string) => {
    setSnackbarState({
      open: true,
      message,
      severity: 'error',
    });
  };

  const showSnackBarSuccess = (message: string) => {
    setSnackbarState({
      open: true,
      message,
      severity: 'success',
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (_event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackBarError, showSnackBarSuccess }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarState.open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
        sx={{
          margin: {
            xs: '40px',
            sm: '24px',
            md: '16px',
            lg: '8px',
          },
        }}
      >
        <Alert
          variant="filled"
          severity={snackbarState.severity}
          sx={{
            width: '100%',
            backgroundColor:
              snackbarState.severity === 'error' ? theme.palette.error.main : theme.palette.success.main,
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext };
