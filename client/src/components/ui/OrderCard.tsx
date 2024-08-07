import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
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

  return (
    <Card sx={{ width: '100%', display: 'flex', padding: '40px', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%' }}>
        <Box sx={{ flex: 1, mr: { md: 2 }, mb: { xs: 2, md: 0 } }}>
          <Typography gutterBottom variant="h6" component="div">
            Имя пользователя: {order.userName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Адрес: {order.address}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Цвет пластинки: {order.color}
          </Typography>
          <Typography variant="h6">Аудио:</Typography>
          <Box display="flex" flexDirection="column">
            {order.tracks.map((track) => (
              <Typography gutterBottom variant="body2" color="text.secondary">
                {track}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={{ flex: 1, mr: { md: 2 }, mb: { xs: 2, md: 0 } }}>
          <Typography gutterBottom variant="h6" component="div">
            Контакты:
          </Typography>
          <Box display='flex' alignItems="center">
            <Typography gutterBottom variant="body2" color="text.secondary">
              Email: {order.email}
            </Typography>
            <IconButton href={`mailto:${order.email}`} target="_blank" rel="noopener noreferrer">
              <EmailIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box display='flex' alignItems="center">
            <Typography gutterBottom variant="body2" color="text.secondary">
              Телефон: {order.phone}
            </Typography>
            <IconButton href={`tel:+7${order.phone}`} target="_blank" rel="noopener noreferrer">
              <LocalPhoneIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center', mb: { xs: 2, md: 0 } }}>
          <CardMedia
            component="img"
            image={`/img/${order.userImg}`}
            alt="img"
            sx={{ borderRadius: '50%', height: '200px', width: '200px', objectFit: 'cover' }}
          />
        </Box>
      </Box>
      <hr style={{ border: '1px solid black', margin: '20px 0' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography gutterBottom variant="h5" component="div">
          Итоговая сумма: {order.totalPrice} р.
        </Typography>
        <Typography gutterBottom variant="h5" component="div" color="red">
          Статус: {status}
        </Typography>
        {currentUser.roleId === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => void handleStatusChange('Новый')}
              disabled={status === 'Новый'}
              sx={{
                marginRight: '8px',
                marginBottom: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
                color: '#fff', // Белый текст
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
                },
              }}
            >
              Новый
            </Button>
            <Button
              variant="contained"
              onClick={() => void handleStatusChange('В работе')}
              disabled={status === 'В работе'}
              sx={{
                marginRight: '8px',
                marginBottom: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
                color: '#fff', // Белый текст
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
                },
              }}
            >
              В работе
            </Button>
            <Button
              variant="contained"
              onClick={() => void handleStatusChange('Выполнен')}
              disabled={status === 'Выполнен'}
              sx={{
                marginRight: '8px',
                marginBottom: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
                color: '#fff', // Белый текст
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
                },
              }}
            >
              Выполнен
            </Button>
            <Button
              variant="contained"
              onClick={() => void downloadArchive(order)}
              sx={{
                marginRight: '8px',
                marginBottom: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
                color: '#fff', // Белый текст
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
                },
              }}
            >
              Скачать архив
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
}
