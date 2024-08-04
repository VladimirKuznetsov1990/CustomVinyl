import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Box,
  CardMedia,
  Select,
  MenuItem,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getFormatVinylThunk } from '../../redux/slices/formatVinyl/formatVinylThunk';
import { addOrderThunk } from '../../redux/slices/order/orderThunk';
import type { OrderDataType } from '../../types/orderTypes';
import ImageUploadAndCrop from '../ui/ImageUploadAndCrop';
import { setCroppedImage } from '../../redux/slices/image/imageSlice';

export default function OrderPage(): JSX.Element {
  const formatVinyls = useAppSelector((state) => state.format.data);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.userStatus);
  const [quantity, setQuantity] = useState(1); // Количество пластинок
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // Общая стоимость
  const croppedImage = useAppSelector((store) => store.image.croppedImage); //кропнутое изображение
  const [audioFile, setAudioFile] = useState<File | null>(null); // Файл аудио
  
  
  useEffect(() => {
    void dispatch(getFormatVinylThunk());
    console.log(typeof(croppedImage))
  }, [dispatch, croppedImage]);

  const [formDataOrder, setFormDataOrder] = useState<OrderDataType>({
    userId: 0,
    status: '',
    totalPrice: 0,
  });

  const handleSaveCroppedImage = (image: string): void => {
    dispatch(setCroppedImage(image));
  };

  const OrderHandleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (user && user.id !== undefined) {
      const newOrder: OrderDataType = {
        userId: user.id,
        status: 'newOrder',
        totalPrice,
      };

      void dispatch(addOrderThunk(newOrder));
    } else {
      console.error('User is not authenticated or user ID is undefined');
    }
  };

  // Пример функции для расчета общей стоимости
  const calculateTotalPrice = (): void => {
    // Пример расчета стоимости, замените на вашу логику
    const pricePerUnit = 1000; // Цена за одну пластинку
    const additionalPriceForColor = selectedColor !== '' ? 500 : 0; // Дополнительная цена за цвет
    let additionalPriceForFormat = 0;

    if (selectedFormat === 'Single') {
      additionalPriceForFormat = 0;
    } else if (selectedFormat === 'EP') {
      additionalPriceForFormat = 1000;
    } else if (selectedFormat === 'LP') {
      additionalPriceForFormat = 2000;
    }

    const totalAdditionalPrice = additionalPriceForColor + additionalPriceForFormat;
    setTotalPrice(quantity * (pricePerUnit + totalAdditionalPrice));
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [quantity, selectedColor, selectedFormat]);

  // Функция для получения пути к изображению в зависимости от выбранного цвета
  const getImagePath = (): string => {
    switch (selectedColor) {
      case 'red':
        return '/img/Vinyl_red.png';
      case 'blue':
        return '/img/Vinyl_blue.png';
      case 'green':
        return '/img/Vinyl_green.png';
      default:
        return '/img/Vinyl+.png';
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '80px',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          backgroundColor: '#444',
          borderRadius: '8px',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: 'white', textAlign: 'center' }}
        >
          Оформление заказа
        </Typography>
        <Box
          sx={{
            padding: '40px',
            border: '3px solid black',
            backgroundColor: 'white',
            borderRadius: '20px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px',
                  background: `url(${getImagePath()}) no-repeat 50% / cover`,
                  animation: 'spin 7s linear infinite',
                }}
              >
                {croppedImage && (<CardMedia
                  component="img"
                  image={croppedImage}
                  alt="Vinyl"
                  sx={{ maxWidth: '100%', position: 'absolute', height: '92%', width: '92%', borderRadius: '50%', opacity: '.7' }}
                />)}
              </Box>
            </Grid>
            <ImageUploadAndCrop vinylImage={getImagePath} onSave={handleSaveCroppedImage} />
            <Grid item xs={12} md={6}>
              <Box component="form" onSubmit={OrderHandleSubmit}>
                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="format-label">Формат пластинки</InputLabel>
                  <Select
                    labelId="format-label"
                    id="format-select"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    label="Формат пластинки"
                  >
                    <MenuItem value="">Выберите формат пластинки</MenuItem>
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="EP">EP</MenuItem>
                    <MenuItem value="LP">LP</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="color-label">Цвет</InputLabel>
                  <Select
                    labelId="color-label"
                    id="color-select"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    label="Цвет"
                  >
                    <MenuItem value="">Выберите цвет</MenuItem>
                    <MenuItem value="red">Красный</MenuItem>
                    <MenuItem value="blue">Синий</MenuItem>
                    <MenuItem value="green">Зеленый</MenuItem>
                    {/* Добавьте другие цвета по мере необходимости */}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <input
                    id="audio-file-input"
                    type="file"
                    accept="audio/*"
                    style={{ display: 'none' }}
                    onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  />
                  <Button variant="contained" component="label" htmlFor="audio-file-input">
                    Выберите аудио файл
                  </Button>
                </FormControl>

                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-quantity">Количество</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    label="Количество"
                  />
                </FormControl>

                <Typography variant="h6" gutterBottom>
                  Общая стоимость: {totalPrice}
                </Typography>

                <Button type="submit" variant="contained" color="primary">
                  Добавить в корзину
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
