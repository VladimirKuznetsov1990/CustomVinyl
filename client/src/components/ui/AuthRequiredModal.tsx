import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { openModal, closeModal } from '../../redux/slices/modal/modalSlice';

export default function AuthRequiredModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modal.authRequired);

  const handleClose = (): void => {
    dispatch(closeModal('authRequired'));
  };

  const handleLogin = (): void => {
    dispatch(closeModal('authRequired'));
    dispatch(openModal({ modalType: 'login' }));
  };

  const handleSignUp = (): void => {
    dispatch(closeModal('authRequired'));
    dispatch(openModal({ modalType: 'signUp' }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>Авторизация</DialogTitle>
      <DialogContent>
        <Typography>Для оформления заказа необходимо войти или зарегистрироваться.</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          sx={{
            marginRight: '8px',
            marginBottom: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
            color: '#fff', // Белый текст
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
            },
          }}
          onClick={handleLogin}
          color="primary"
        >
          Войти
        </Button>
        <Button
          sx={{
            marginRight: '8px',
            marginBottom: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
            color: '#fff', // Белый текст
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
            },
          }}
          onClick={handleSignUp}
          color="primary"
        >
          Зарегистрироваться
        </Button>
      </DialogActions>
    </Dialog>
  );
}
