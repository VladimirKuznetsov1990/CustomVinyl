import { Card, CardContent, CardMedia, Divider, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import type { OrderType } from '../../types/orderTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateStatusOrderThunk } from '../../redux/slices/order/orderThunk';

type OrderCardTypes = {
  order: OrderType;
};

export default function OrderCard({ order}: OrderCardTypes): JSX.Element {
  const [status, setStatus] = useState(order.status);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.userStatus);

  const handleStatusChange = async (newStatus: string): Promise<void> => {
    try {
      await dispatch(updateStatusOrderThunk({ id: order.id, obj: { status: newStatus } }));
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };
console.log(order);

  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="70"
        image={order.userImg}
        alt="img"
        sx={{ borderRadius: '16px', width: '100%', objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          Имя пользователя: {order.userName}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Email: {order.email}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Адрес: {order.address}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Телефон: {order.phone}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Цвет пластинки: {order.color}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {order.tracks}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Итоговая сумма: {order.totalPrice}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" color="red">
          Статус: {status}
        </Typography>
        {currentUser.roleId === 1 && (
          <>
            <Button
              variant="contained"
              onClick={() => handleStatusChange('Новый')}
              disabled={status === 'Новый'}
              sx={{ marginRight: '8px', marginBottom: '8px' }}
            >
              Новый
            </Button>
            <Button
              variant="contained"
              onClick={() => handleStatusChange('В работе')}
              disabled={status === 'В работе'}
              sx={{ marginRight: '8px', marginBottom: '8px' }}
            >
              В работе
            </Button>
            <Button
              variant="contained"
              onClick={() => handleStatusChange('Выполнен')}
              disabled={status === 'Выполнен'}
              sx={{ marginRight: '8px', marginBottom: '8px' }}
            >
              Выполнен
            </Button>
          </>
        )}
      </CardContent>
      <Divider />
    </Card>
  );
}
