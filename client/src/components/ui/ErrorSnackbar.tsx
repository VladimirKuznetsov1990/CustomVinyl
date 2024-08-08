import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { clearError } from '../../redux/slices/auth/authSlice';
import type { RootState } from '../../redux/store';

export default function ErrorSnackbar(): JSX.Element {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearError());
  };

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}
