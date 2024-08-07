import React from 'react';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import type { UserSignUpType } from '../../types/userTypes';
import { signUpThunk } from '../../redux/slices/auth/authThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { closeModal, openModal } from '../../redux/slices/modal/modalSlice';

export default function SignUpModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modal.signUp);

  const handleClose = (): void => {
    dispatch(closeModal('signUp'));
  };

  const handleSwitchToLogin = (): void => {
    dispatch(closeModal('signUp'));
    dispatch(openModal({ modalType: 'login' }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Регистрация нового пользователя</DialogTitle>
      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        margin="15px"
        padding="15px"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpType;
          void dispatch(signUpThunk(formData));
        }}
      >
        <TextField name="userName" label="Логин" variant="outlined" />
        <br />
        <TextField name="email" type="email" label="Email" variant="outlined" />
        <br />
        <TextField name="password" type="password" label="Пароль" variant="outlined" />
        <br />
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
          onClick={handleClose}
          type="submit"
        >
          Зарегистрироваться
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
          onClick={handleSwitchToLogin}
        >
          Уже есть аккаунт
        </Button>
      </Box>
    </Dialog>
  );
}
