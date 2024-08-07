import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import type { OrderType } from '../../types/orderTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateStatusOrderThunk } from '../../redux/slices/order/orderThunk';

type OrderCardTypes = {
  order: OrderType;
  downloadArchive: (order: OrderType) => void;
};

export default function OrderCard({ order, downloadArchive }: OrderCardTypes): JSX.Element {
  const [status, setStatus] = useState(order.status);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.userStatus);

  // const handleStatusChange = async (newStatus: string): Promise<void> => {
  //   try {
  //     await dispatch(updateStatusOrderThunk({ id: order.id, obj: { status: newStatus } }));
  //     setStatus(newStatus);
  //   } catch (error) {
  //     console.error('Failed to update order status:', error);
  //   }
  // };

  const handleStatusChange = (newStatus: string): void => {
    dispatch(updateStatusOrderThunk({ id: order.id, obj: { status: newStatus } }))
      .then(() => {
        setStatus(newStatus);
      })
      .catch((error) => {
        console.error('Failed to update order status:', error);
      });
  };

  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {order.userImg !== '' ? (
        <CardMedia
          component="img"
          image={`/img/${order.userImg}`}
          alt="img"
          sx={{ borderRadius: '50%', height: '100px', width: '100px', objectFit: 'cover' }}
        />
      ) : (
        <Typography>без</Typography>
      )}
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
        <Box display="flex" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            Телефон: {order.phone}
          </Typography>
          <IconButton href={`tel:+7${order.phone}`} target="_blank" rel="noopener noreferrer">
            <LocalPhoneIcon fontSize="large" />
          </IconButton>
        </Box>
        <Typography gutterBottom variant="h6" component="div">
          Цвет пластинки: {order.color}
        </Typography>
        <Typography variant="h6">Аудио:</Typography>
        <Box display="flex" flexDirection="column">
          {order.tracks === null || order.tracks.length === 0 ? (
            <Typography>без</Typography>
          ) : (
            order.tracks.map((track) => (
              <Typography key={track} gutterBottom variant="body2" color="text.secondary">
                {track}
              </Typography>
            ))
          )}
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
