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
import { closeModal } from '../../redux/slices/modal/modalSlice';

export default function OrderSuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modal.orderSuccess);

  const handleClose = (): void => {
    dispatch(closeModal('orderSuccess'));
  };

  const handleGoToHome = (): void => {
    window.location.href = '/';
    handleClose();
  };

  const handleGoToOrders = (): void => {
    window.location.href = '/account'; // Предположим, что заказы находятся на странице аккаунта
    handleClose();
  };

  const handleCreateNewOrder = (): void => {
    window.location.href = '/order';
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>Заказ успешно добавлен!</DialogTitle>
      <DialogContent>
        <Typography>Ваш заказ был успешно добавлен. Что вы хотите сделать дальше?</Typography>
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
          onClick={handleGoToHome}
          color="primary"
        >
          На главную
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
          onClick={handleGoToOrders}
          color="primary"
        >
          К заказам
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
          onClick={handleCreateNewOrder}
          color="primary"
        >
          Создать еще один заказ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
