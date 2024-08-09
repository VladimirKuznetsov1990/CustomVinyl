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
      <DialogTitle sx={{ textAlign: 'center' }}>Поздравляю! Ваш Заказ успешно создан!</DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: 'center' }}>Наш менееджер свяжется с вами в ближайшее время.</Typography>
        <Typography sx={{ textAlign: 'center' }}>Отслеживайте статус вашего заказа в личном кабинете.</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          width: { xs: '300px', sm: '500px' },
        }}
      >
        <Button
          sx={{
            margin: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
            color: '#fff', // Белый текст
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
            },
            width: { xs: '100%', sm: 'auto' },
          }}
          onClick={handleGoToHome}
          color="primary"
        >
          На главную
        </Button>
        <Button
          sx={{
            margin: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
            color: '#fff', // Белый текст
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
            },
            width: { xs: '100%', sm: 'auto' },
          }}
          onClick={handleGoToOrders}
          color="primary"
        >
          К заказам
        </Button>
        <Button
          sx={{
            margin: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
            color: '#fff', // Белый текст
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
            },
            width: { xs: '100%', sm: 'auto' },
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
