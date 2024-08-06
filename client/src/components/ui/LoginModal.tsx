import React from 'react';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import type { UserLoginType } from '../../types/userTypes';
import { loginThunk } from '../../redux/slices/auth/authThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { closeModal, openModal } from '../../redux/slices/modal/modalSlice';

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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{textAlign: 'center'}}>Вход</DialogTitle>
      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        margin="15px"
        padding="15px"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserLoginType;
          void dispatch(loginThunk(formData));
        }}
      >
        <TextField name="email" type="email" label="Email" variant="outlined" />
        <br />
        <TextField name="password" type="password" label="Пароль" variant="outlined" />
        <br />
        <Button onClick={handleClose} type="submit">
          Вход
        </Button>
        <Button onClick={handleSwitchToSignUp}>
          Регистрация
        </Button>
      </Box>
    </Dialog>
  );
}
