import { Card, CardMedia, Typography, Button, Box, IconButton, Chip } from '@mui/material';
import React, { useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import type { OrderType } from '../../types/orderTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateStatusOrderThunk, deleteOrderThunk } from '../../redux/slices/order/orderThunk';

type OrderCardTypes = {
  order: OrderType;
  downloadArchive: (order: OrderType) => Promise<void>;
};

type ImagePaths = {
  main: {
    Зеленый: string;
    Синий: string;
    Красный: string;
    Стандарт: string;
    Фиолетовый: string;
    Оранжевый: string;
    Желтый: string;
    Серебряный: string;
  };
  additional: {
    Зеленый: string;
    Синий: string;
    Красный: string;
    Стандарт: string;
    Фиолетовый: string;
    Оранжевый: string;
    Желтый: string;
    Серебряный: string;
  };
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

  const handleDeleteOrder = async (id: number): Promise<void> => {
    try {
      await dispatch(deleteOrderThunk(id));
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const images: ImagePaths = {
    main: {
      Зеленый: '/static/img/Vinyl_green.png',
      Синий: '/static/img/Vinyl_blue.png',
      Красный: '/static/img/Vinyl_red.png',
      Стандарт: '/static/img/1Vinyl+.png',
      Фиолетовый: '/static/img/VinylsPurple1.png',
      Оранжевый: '/static/img/VinylsOrange1.png',
      Желтый: '/static/img/VinylsYellow1.png',
      Серебряный: '/static/img/VinylsWhite1.png',
    },
    additional: {
      Зеленый: '/static/img/Vinyl+Green_mid.png',
      Синий: '/static/img/Vinyl+Blue_mid.png',
      Красный: '/static/img/Vinyl+Red_mid.png',
      Стандарт: '/static/img/Vinyl+Custom_mid.png',
      Фиолетовый: '/static/img/VinylsPurple2.png',
      Оранжевый: '/static/img/VinylsOrange2.png',
      Желтый: '/static/img/VinylsYellow2.png',
      Серебряный: '/static/img/VinylsWhite2.png',
    },
  };

  const getImagePath = (color: string, type: keyof ImagePaths): string =>
    images[type][color as keyof (typeof images)[typeof type]] || images[type].Стандарт;

  const getStatusColor = (statusValue: string): 'error' | 'warning' | 'success' | 'default' => {
    switch (statusValue) {
      case 'Новый':
        return 'error';
      case 'В работе':
        return 'warning';
      case 'Выполнен':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        padding: '40px',
        flexDirection: 'column',
        height: '100%',
      }}
    >
          <Typography variant='h5' sx={{fontWeight: 800}}>Номер заказа: #{order.id + 1000 } </Typography>
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
            {order.tracks === null || order.tracks.length === 0 ? (
              <Typography>Без аудиофайлов</Typography>
            ) : (
              order.tracks.map((track) => (
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {track}
                </Typography>
              ))
            )}
          </Box>
        </Box>
        <Box sx={{ flex: 1, mr: { md: 2 }, mb: { xs: 2, md: 0 } }}>
          <Typography gutterBottom variant="h6" component="div">
            Контакты:
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography gutterBottom variant="body2" color="text.secondary">
              Email: {order.email}
            </Typography>
            <IconButton href={`mailto:${order.email}`} target="_blank" rel="noopener noreferrer">
              <EmailIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography gutterBottom variant="body2" color="text.secondary">
              Телефон: {order.phone}
            </Typography>
            <IconButton href={`tel:+7${order.phone}`} target="_blank" rel="noopener noreferrer">
              <LocalPhoneIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
            justifyContent: 'center',
            mb: { xs: 2, md: 0 },
            position: 'relative', // Добавляем position: relative для контейнера
          }}
        >
          <CardMedia
            component="img"
            image={getImagePath(order.color, 'main')} // Путь к первому слою изображения
            alt="additional color layer"
            sx={{
              borderRadius: '50%',
              height: { xs: '100px', md: '200px' },
              width: { xs: '100px', md: '200px' },
              objectFit: 'cover',
              position: 'absolute',
              zIndex: 1, // Первый слой
              right: { xs: '-20px', md: 'auto' },
              bottom: { xs: '20px', md: 'auto' },
            }}
          />
          {order.userImg && (
            <CardMedia
              component="img"
              image={`/img/${order.userImg}`}
              alt="img"
              sx={{
                borderRadius: '50%',
                height: { xs: '92px', md: '184px' },
                width: { xs: '92px', md: '184px' },
                objectFit: 'cover',
                position: 'absolute',
                opacity: '0.7',
                zIndex: 2, // Второй слой
                right: { xs: '-16px', md: 'auto' },
                bottom: { xs: '24px', md: 'auto' },
              }}
            />
          )}
          {['Зеленый', 'Синий', 'Красный', '', 'Фиолетовый', 'Оранжевый', 'Желтый', 'Серебряный' ].includes(order.color) && (
            <CardMedia
              component="img"
              image={getImagePath(order.color, 'additional')}
              alt={`${order.color} color`}
              sx={{
                borderRadius: '50%',
                height: { xs: '100px', md: '200px' },
                width: { xs: '100px', md: '200px' },
                objectFit: 'cover',
                position: 'absolute',
                zIndex: 3, // Третий слой
                right: { xs: '-20px', md: 'auto' },
                bottom: { xs: '20px', md: 'auto' },
              }}
            />
          )}
        </Box>
      </Box>
      <hr style={{ border: '1px solid black', margin: '20px 0' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography gutterBottom variant="h6" component="div">
          Количество: {order.quantity} шт.
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Итоговая сумма: {order.totalPrice} р.
        </Typography>
        <Chip label={status} color={getStatusColor(status)} sx={{ marginBottom: '16px' }} />
        {currentUser.roleId === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => void handleStatusChange('Новый')}
              disabled={status === 'Новый'}
              sx={{ marginRight: '8px', marginBottom: '8px' }}
            >
              Новый
            </Button>
            <Button
              variant="contained"
              onClick={() => void handleStatusChange('В работе')}
              disabled={status === 'В работе'}
              sx={{ marginRight: '8px', marginBottom: '8px' }}
            >
              В работе
            </Button>
            <Button
              variant="contained"
              onClick={() => void handleStatusChange('Выполнен')}
              disabled={status === 'Выполнен'}
              sx={{ marginRight: '8px', marginBottom: '8px' }}
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
            <Button
              variant="contained"
              onClick={() => void handleDeleteOrder(order.id)}
              sx={{
                marginRight: '8px',
                marginBottom: '8px',
                backgroundColor: 'rgba(255, 0, 0, 0.8)', // Прозрачный красный цвет
                color: '#fff', // Белый текст
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 1)', // Изменение прозрачности при наведении
                },
              }}
            >
              Отменить заказ
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
}
