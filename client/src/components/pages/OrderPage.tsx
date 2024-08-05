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
  IconButton,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
  const [selectedFormat, setSelectedFormat] = useState('Single');
  const [selectedColor, setSelectedColor] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // Общая стоимость
  const [audioFiles, setAudioFiles] = useState<File[]>([]); // Файлы аудио
  const [audioDurations, setAudioDurations] = useState<string[]>([]); // Длительности аудио
  const [totalDuration, setTotalDuration] = useState<string>('00:00'); // Общее время всех треков в формате MM:SS
  const [availableDuration, setAvailableDuration] = useState(0); // Доступное время в секундах
  const [usedDuration, setUsedDuration] = useState(0); // Использованное время в секундах
  const croppedImage = useAppSelector((store) => store.image.croppedImage); // кропнутое изображение
  const [additionalImage, setAdditionalImage] = useState<string | null>(null); // дополнительное изображение
  const [audioFile, setAudioFile] = useState<File | null>(null); // Файл аудио

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    void dispatch(getFormatVinylThunk());
    console.log(croppedImage);
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

  // Функция для получения пути к основному изображению в зависимости от выбранного цвета
  const getMainImagePath = (): string => {
    switch (selectedColor) {
      case 'red':
        return '/img/Vinyl_red.png';
      case 'blue':
        return '/img/Vinyl_blue.png';
      case 'green':
        return '/img/Vinyl_green.png';
      default:
        return '/img/1Vinyl+.png';
    }
  };

  // Функция для получения пути к дополнительному изображению в зависимости от выбранного цвета
  const getAdditionalImagePath = (): string => {
    switch (selectedColor) {
      case 'red':
        return '/img/Vinyl+Red_mid.png';
      case 'blue':
        return '/img/Vinyl+Blue_mid.png';
      case 'green':
        return '/img/Vinyl+Green_mid.png';
      default:
        return '/img/Vinyl+Custom_mid.png';
    }
  };

  // Функция для получения длительности аудиофайлов
  const getAudioDurations = (files: File[]): void => {
    const durations: string[] = [];
    let newUsedDuration = 0; // Новая суммарная длительность

    files.forEach((file) => {
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = () => {
        const { duration } = audio;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        durations.push(formattedDuration);
        newUsedDuration += duration; // Добавляем длительность файла к общей

        setAudioDurations(durations);
        setUsedDuration(newUsedDuration); // Обновляем общее время

        // Обновляем totalDuration только после того, как длительность всех файлов будет получена
        if (durations.length === files.length) {
          const totalMinutes = Math.floor(newUsedDuration / 60);
          const totalSecondsRemaining = Math.floor(newUsedDuration % 60);
          setTotalDuration(
            `${totalMinutes}:${totalSecondsRemaining < 10 ? '0' : ''}${totalSecondsRemaining}`,
          );
        }
      };
    });
  };

  // Функция для удаления аудиофайла
  const handleDeleteAudioFile = (index: number): void => {
    const updatedAudioFiles = [...audioFiles];
    const deletedFile = updatedAudioFiles.splice(index, 1)[0];
    setAudioFiles(updatedAudioFiles);

    const updatedAudioDurations = [...audioDurations];
    updatedAudioDurations.splice(index, 1);
    setAudioDurations(updatedAudioDurations);

    // Вычитаем длительность удаленного файла
    const audio = new Audio(URL.createObjectURL(deletedFile));
    audio.onloadedmetadata = () => {
      setUsedDuration((prevDuration) => prevDuration - audio.duration);
    };

    // Пересчитываем общее время в формате MM:SS
    getAudioDurations(updatedAudioFiles);
  };

  // Функция для добавления аудиофайлов
  const handleAddAudioFiles = async (newFiles: File[]): Promise<void> => {
    let newTotalDuration = usedDuration;

    const audioPromises = newFiles.map(
      (file) =>
        new Promise<number>((resolve) => {
          const audio = new Audio(URL.createObjectURL(file));
          audio.onloadedmetadata = () => {
            resolve(audio.duration);
          };
        }),
    );

    const durations = await Promise.all(audioPromises);
    newTotalDuration += durations.reduce((sum, duration) => sum + duration, 0);

    if (newTotalDuration > availableDuration) {
      alert('Превышено допустимое время для выбранного формата');
      return;
    }

    setAudioFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Обработчик события onChange для input[type="file"]
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    if (files) {
      void handleAddAudioFiles(Array.from(files));
    }
  };

  // Обновление доступного времени при изменении формата
  useEffect(() => {
    let maxDuration = 0;
    if (selectedFormat === 'Single') {
      maxDuration = 10 * 60;
    } else if (selectedFormat === 'EP') {
      maxDuration = 20 * 60;
    } else if (selectedFormat === 'LP') {
      maxDuration = 40 * 60;
    }
    setAvailableDuration(maxDuration);
    setUsedDuration(0);
    setAudioFiles([]);
    setAudioDurations([]);
  }, [selectedFormat]);

  // Вызов getAudioDurations при изменении списка файлов
  useEffect(() => {
    if (audioFiles.length > 0) {
      getAudioDurations(audioFiles);
    }
  }, [audioFiles]);

  // Обновление дополнительного изображения при изменении выбранного цвета
  useEffect(() => {
    setAdditionalImage(getAdditionalImagePath());
  }, [selectedColor]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: isMobile ? '20px' : '80px',
      }}
    >
      <Box
        sx={{
          padding: isMobile ? '10px' : '20px',
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
            padding: isMobile ? '20px' : '40px',
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
                  height: isMobile ? '300px' : '500px',
                  background: `url(${getMainImagePath()}) no-repeat center center / contain`,
                  animation: 'spin 7s linear infinite',
                }}
              >
                {croppedImage && (
                  <CardMedia
                    component="img"
                    image={croppedImage}
                    alt="Vinyl"
                    sx={{
                      maxWidth: '100%',
                      position: 'absolute',
                      height: '92%',
                      width: '92%',
                      borderRadius: '50%',
                      opacity: '.7',
                    }}
                  />
                )}
                {additionalImage && (
                  <CardMedia
                    component="img"
                    image={additionalImage}
                    alt="Additional"
                    sx={{
                      maxWidth: '100%',
                      position: 'absolute',
                      height: '92%',
                      width: '92%',
                      borderRadius: '50%',
                      opacity: '.95',
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
              
              <ImageUploadAndCrop vinylImage={getMainImagePath} onSave={handleSaveCroppedImage} />
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
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="EP">EP</MenuItem>
                    <MenuItem value="LP">LP</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <input
                    id="audio-file-input"
                    type="file"
                    accept="audio/*, .m4r,.mp3,.acc"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                    multiple
                  />
                  <Button variant="contained" component="label" htmlFor="audio-file-input">
                    Выберите аудио файлы
                  </Button>
                </FormControl>

                {audioFiles.length > 0 ? (
                  <TableContainer
                    component={Paper}
                    sx={{
                      mb: 4,
                      border: '1px solid black',
                      maxHeight: audioFiles.length > 3 ? '300px' : 'auto', // Устанавливаем максимальную высоту, если треков больше 5
                    }}
                  >
                    <Table aria-label="track table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Картинка</TableCell>
                          <TableCell>Название трека</TableCell>
                          <TableCell>Длительность</TableCell>
                          <TableCell>Удалить</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {audioFiles.map((file, index) => (
                          <TableRow key={file.name}>
                            <TableCell>
                              {' '}
                              <Avatar
                                src="/path/to/track/image.jpg"
                                alt={file.name}
                                sx={{ mr: 2 }}
                              />
                            </TableCell>
                            <TableCell>{`${file.name.slice(0, 20)}...`}</TableCell>
                            <TableCell>{audioDurations[index] || 'Загрузка...'}</TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteAudioFile(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                      marginBottom: '20px',
                      textAlign: 'center',
                      color: usedDuration > availableDuration ? 'red' : 'inherit',
                    }}
                  >
                    Общее время всех треков: {totalDuration} из {Math.floor(availableDuration / 60)}
                    :00
                  </Typography>
                )}
                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-quantity">Количество</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    label="Количество"
                  />
                </FormControl>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Добавить в корзину
                  </Button>
                  <Typography variant="h6" gutterBottom>
                    Общая стоимость:{' '}
                    <Typography component="span" sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                      {totalPrice} руб
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
