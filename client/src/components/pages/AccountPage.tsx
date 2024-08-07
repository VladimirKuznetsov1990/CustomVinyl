import { Container, Typography, Grid, Box, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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

  // const downloadArchive = async (order: OrderType): Promise<void> => {
  //   const zip = new JSZip();

  //   // Добавляем кропнутое изображение
  //   const imageResponse = await fetch(`/img/${order.userImg}`);
  //   const imageBlob = await imageResponse.blob();
  //   zip.file('cropped_image.png', imageBlob);

  //   // Добавляем музыкальные файлы
  //   const trackPromises = order.tracks.map(async (track, index) => {
  //     const trackResponse = await fetch(`/audio/${track}`);
  //     const trackBlob = await trackResponse.blob();
  //     zip.file(`track_${index + 1}.mp3`, trackBlob);
  //   });

  //   await Promise.all(trackPromises);


  //   const content: Blob = await zip.generateAsync({ type: 'blob' });
  //   saveAs(content, `order_${order.id}.zip`);
  // };
  const downloadArchive = (order: OrderType): void => {
    const zip = new JSZip();
  
    // Добавляем кропнутое изображение
    fetch(`/img/${order.userImg}`)
      .then((imageResponse) => imageResponse.blob())
      .then((imageBlob) => {
        zip.file('cropped_image.png', imageBlob);
  
        // Добавляем музыкальные файлы
        const trackPromises = order.tracks.map((track, index) =>
          fetch(`/audio/${track}`)
            .then((trackResponse) => trackResponse.blob())
            .then((trackBlob) => {
              zip.file(`track_${index + 1}.mp3`, trackBlob);
            })
        );
  
        return Promise.all(trackPromises);
      })
      .then(() => zip.generateAsync({ type: 'blob' }))
      .then((content) => {
        saveAs(content, `order_${order.id}.zip`);
      })
      .catch((error) => {
        console.error('Failed to download archive:', error);
      });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '40px',
      }}
    >
      <Box sx={{ marginTop: '100px' }}>
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: '#333', // Темный фон для контраста
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: '20px',
              backgroundColor: '#444',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
              Ваши заказы
            </Typography>
            <Box sx={{ marginBottom: '20px', color: 'white' }}>
              <Typography variant="body1" gutterBottom>
                Добро пожаловать на страницу заказов. Здесь вы можете просмотреть и управлять своими
                заказами.
              </Typography>
            </Box>
            {user.roleId === 1 && (
              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel id="status-filter-label" sx={{ color: 'white' }}>Сортировать по статусу</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Сортировать по статусу"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ color: 'white', borderColor: 'white', '.MuiSvgIcon-root': { color: 'white' } }}
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
