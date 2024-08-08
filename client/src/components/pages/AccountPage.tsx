import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import OrderCard from '../ui/OrderCard';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getOrdersThunk } from '../../redux/slices/order/orderThunk';
import { type OrderType } from '../../types/orderTypes';

export default function AccountPage(): JSX.Element {
  const orders = useAppSelector((state) => state.order.data);
  const user = useAppSelector((state) => state.auth.userStatus);
  const dispatch = useAppDispatch();
  const [statusFilter, setStatusFilter] = useState<string>('Все');

  useEffect(() => {
    void dispatch(getOrdersThunk());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => {
    if (user.roleId !== 1 && order.userId !== user.id) {
      return false;
    }
    if (statusFilter !== 'Все' && order.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const downloadArchive = async (order: OrderType): Promise<void> => {
    const zip = new JSZip();

    // Добавляем кропнутое изображение
    const imageResponse = await fetch(`/img/${order.userImg}`);
    const imageBlob = await imageResponse.blob();
    zip.file('cropped_image.png', imageBlob);

    // Добавляем музыкальные файлы
    const trackPromises = order.tracks.map(async (track, index) => {
      const trackResponse = await fetch(`/audio/${track}`);
      const trackBlob = await trackResponse.blob();
      zip.file(`track_${index + 1}.mp3`, trackBlob);
    });

    await Promise.all(trackPromises);

    const content: Blob = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `order_${order.id}.zip`);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '20px',
        backgroundImage: `url(/static/img/fon.gif)`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <Box sx={{ marginTop: '100px' }}>
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            borderRadius: '8px',
            border: 'solid 2px #00FEFC',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '8px',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ color: 'white', textAlign: 'center' }}
            >
              Ваши заказы
            </Typography>
            <hr style={{ border: '1px solid white', margin: '20px 0' }} />
            <Box sx={{ marginBottom: '20px', color: 'white', textAlign: 'center' }}>
              <Typography variant="body1" gutterBottom>
                Добро пожаловать на страницу заказов. Здесь вы можете просмотреть все свои заказы.
              </Typography>
            </Box>
            {user.roleId === 1 && (
              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel
                  id="status-filter-label"
                  sx={{
                    color: 'white',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  }}
                >
                  Сортировать по статусу
                </InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Сортировать по статусу"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem value="Все">Все</MenuItem>
                  <MenuItem value="Новый">Новый</MenuItem>
                  <MenuItem value="В работе">В работе</MenuItem>
                  <MenuItem value="Выполнен">Выполнен</MenuItem>
                </Select>
              </FormControl>
            )}
            <Box sx={{ marginBottom: '20px', color: 'white' }}>
              <Grid container spacing={3}>
                {filteredOrders.map((el) => (
                  <Grid item xs={12} key={el.id}>
                    <OrderCard downloadArchive={downloadArchive} order={el} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Container>
  );
}
