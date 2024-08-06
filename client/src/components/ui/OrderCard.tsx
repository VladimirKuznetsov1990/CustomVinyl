import { Card, CardContent, CardMedia, Divider, Typography, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import type { OrderType } from '../../types/orderTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateStatusOrderThunk } from '../../redux/slices/order/orderThunk';

type OrderCardTypes = {
  order: OrderType;
  downloadArchive: (order: OrderType) => Promise<void>;
};

export default function OrderCard({ order, downloadArchive }: OrderCardTypes): JSX.Element {
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
console.log(order.userImg);

  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        image={`/img/${order.userImg}`}
        alt="img"
        sx={{ borderRadius: '50%', height: '100px', width: '100px', objectFit: 'cover' }}
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
        <Typography variant='h6'>Аудио:</Typography>
        <Box display="flex" flexDirection="column">
          {order.tracks.map((track) => (
            <Typography gutterBottom variant="body2" color="text.secondary">
              {track}
          </Typography>
          ))}
        </Box>
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
            <Button
              variant="contained"
              onClick={() => downloadArchive(order)}
              sx={{ marginRight: '8px', marginBottom: '8px' }}
            >
              Скачать архив
            </Button>
          </>
        )}
      </CardContent>
      <Divider />
    </Card>
  );
}
