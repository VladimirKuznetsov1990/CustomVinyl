import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import type { UserSignUpType } from '../../types/userTypes';
import { signUpThunk } from '../../redux/slices/auth/authThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { closeModal, openModal } from '../../redux/slices/modal/modalSlice';
import { setError } from '../../redux/slices/auth/authSlice';
import '../style/styles-order.css';

export default function SignUpModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modal.signUp);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleClose = (): void => {
    dispatch(closeModal('signUp'));
  };

  const handleSwitchToLogin = (): void => {
    dispatch(closeModal('signUp'));
    dispatch(openModal({ modalType: 'login' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpType;

    // Валидация полей
    if (!formData.userName || !formData.email || !formData.password) {
      dispatch(setError('Ошибка регистрации: Все поля должны быть заполнены'));
      return;
    }

    // Проверка наличия символа @ в email
    if (!formData.email.includes('@')) {
      setEmailError('Некорректный email адрес');
      return;
    }

    setEmailError(null); // Сброс ошибки email, если она была

    dispatch(signUpThunk(formData))
      .unwrap()
      .then(() => {
        // Закрытие модалки при успешной регистрации
        dispatch(closeModal('signUp'));
      })
      .catch((error) => {
        dispatch(setError('Ошибка регистрации: Пользователь с таким email уже существует'));
        console.log(error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>Регистрация</DialogTitle>
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
          name="userName"
          type="text"
          label="Имя пользователя"
          variant="outlined"
          sx={{ mb: 1 }}
          className="custom-form-control"
        />
        <TextField
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          sx={{ mb: 1 }}
          className="custom-form-control"
          error={!!emailError}
          helperText={emailError}
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
          type="submit"
        >
          Регистрация
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
          onClick={handleSwitchToLogin}
        >
          Вход
        </Button>
      </Box>
    </Dialog>
  );
}
