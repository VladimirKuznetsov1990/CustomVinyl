import React from 'react';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import type { UserLoginType } from '../../types/userTypes';
import { loginThunk } from '../../redux/slices/auth/authThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { closeModal, openModal } from '../../redux/slices/modal/modalSlice';
import { setError } from '../../redux/slices/auth/authSlice';
import '../style/styles-order.css';

export default function LoginModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modal.login);

  const handleClose = (): void => {
    dispatch(closeModal('login'));
  };

  const handleSwitchToSignUp = (): void => {
    dispatch(closeModal('login'));
    dispatch(openModal({ modalType: 'signUp' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserLoginType;
    dispatch(loginThunk(formData))
      .unwrap()
      .catch((error) => {
        dispatch(setError('Не удалось войти: неверный адрес электронной почты или пароль.'));
        console.log(error);
        
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>Вход</DialogTitle>
      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        margin="15px"
        padding="10px"
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          sx={{ mb: 1 }}
          className="custom-form-control"
        />
        <TextField
          name="password"
          type="password"
          label="Пароль"
          variant="outlined"
          sx={{ mb: 1 }}
          className="custom-form-control"
        />
        <Button
          sx={{
            margin: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
            color: '#fff', // Белый текст
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
            },
          }}
          onClick={handleClose}
          type="submit"
        >
          Вход
        </Button>
        <Button
          sx={{
            margin: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
            color: '#fff', // Белый текст
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
            },
          }}
          onClick={handleSwitchToSignUp}
        >
          Регистрация
        </Button>
      </Box>
    </Dialog>
  );
}
