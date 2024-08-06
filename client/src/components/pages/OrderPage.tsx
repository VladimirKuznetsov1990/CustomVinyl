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
import { openModal } from '../../redux/slices/modal/modalSlice';

export default function OrderPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.userStatus);
  const [quantity, setQuantity] = useState(1); // Количество пластинок
  // const [selectedFormat, setSelectedFormat] = useState('Single');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // Общая стоимость
  const [audioFiles, setAudioFiles] = useState<File[]>([]); // Файлы аудио
  const [audioDurations, setAudioDurations] = useState<string[]>([]); // Длительности аудио
  const [totalDuration, setTotalDuration] = useState<string>('00:00'); // Общее время всех треков в формате MM:SS
  const [availableDuration, setAvailableDuration] = useState(0); // Доступное время в секундах
  const [usedDuration, setUsedDuration] = useState(0); // Использованное время в секундах
  const [additionalImage, setAdditionalImage] = useState<string | null>(null); // дополнительное изображение
  const [typeShop, setTypeShop] = useState<string>('Самовывоз');
  const [phone, setPhone] = useState<string>('');
  const [delieveryAddress, setDelieveryAddress] = useState<string>('');
  const croppedImage = useAppSelector((store) => store.image.croppedImage); // кропнутое изображение
  const formats = useAppSelector((store) => store.format.data);

  useEffect(() => {
    void dispatch(getFormatVinylThunk());
  }, [dispatch]);

  const getImagePaths = (color: string): { mainImagePath: string; additionalImagePath: string } => {
    let mainImagePath = '';
    let additionalImagePath = '';

    switch (color) {
      case 'red':
        mainImagePath = '/static/img/Vinyl_red.png';
        additionalImagePath = '/static/img/Vinyl+Red_mid.png';
        break;
      case 'blue':
        mainImagePath = '/static/img/Vinyl_blue.png';
        additionalImagePath = '/static/img/Vinyl+Blue_mid.png';
        break;
      case 'green':
        mainImagePath = '/static/img/Vinyl_green.png';
        additionalImagePath = '/static/img/Vinyl+Green_mid.png';
        break;
      default:
        mainImagePath = '/static/img/1Vinyl+.png';
        additionalImagePath = '/static/img/Vinyl+Custom_mid.png';
        break;
    }

    return { mainImagePath, additionalImagePath };
  };

  const { mainImagePath, additionalImagePath } = getImagePaths(selectedColor);

  useEffect(() => {
    void dispatch(getFormatVinylThunk());
  }, [dispatch, croppedImage]);

  // const [formDataOrder, setFormDataOrder] = useState<OrderDataType>({
  //   userId: 1,
  //   status: 'pending',
  //   totalPrice,
  //   formatId: Number(selectedFormat),
  //   color: selectedColor,
  //   quantity,
  //   userImg: croppedImage?.fileUrl,
  //   tracks: [],
  // });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleOrderSubmit = async (): Promise<void> => {
    if (!user || !user.id) {
      dispatch(openModal({ modalType: 'authRequired' }));
      return;
    }

    if (!croppedImage || !audioFiles) {
      alert('Please upload files.');
      return;
    }

    const { userName, email } = user;
    const formData = new FormData();
    if (user) {
      formData.append('userId', user?.id.toString());
      formData.append('status', 'Новый');
      formData.append('totalPrice', totalPrice.toString());
      formData.append('formatId', selectedFormat.toString());
      formData.append('color', selectedColor);
      formData.append('quantity', quantity.toString());
      if (userName && email) {
        formData.append('userName', userName.toString());
        formData.append('email', email.toString());
      }
      formData.append('phone', `${phone}`);
      formData.append('address', delieveryAddress);
      formData.append('userImg', croppedImage?.file);
      Array.from(audioFiles).forEach((file) => {
        formData.append('tracks', file);
      });
    }

    try {
      await dispatch(addOrderThunk(formData));
      dispatch(openModal({ modalType: 'orderSuccess' }));
    } catch (error) {
      console.error('Error adding order:', error);
      alert('Failed to add order.');
    }
  };

  // Пример функции для расчета общей стоимости
  const calculateTotalPrice = (): void => {
    // Пример расчета стоимости, замените на вашу логику
    const pricePerUnit = 1000; // Цена за одну пластинку
    const additionalPriceForColor = selectedColor !== '' ? 500 : 0; // Дополнительная цена за цвет
    let additionalPriceForFormat = 0;

    if (selectedFormat) {
      const selectedFormatData = formats.find((format) => format.id === Number(selectedFormat));
      if (selectedFormatData) {
        if (selectedFormatData.format === 'EP') {
          additionalPriceForFormat = 1000;
        } else if (selectedFormatData.format === 'LP') {
          additionalPriceForFormat = 2000;
        }
      }
    }

    const totalAdditionalPrice = additionalPriceForColor + additionalPriceForFormat;
    setTotalPrice(quantity * (pricePerUnit + totalAdditionalPrice));
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [quantity, selectedColor, selectedFormat]);

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
      const newUsedDuration = usedDuration - audio.duration;
      setUsedDuration(newUsedDuration);

      const totalMinutes = Math.floor(newUsedDuration / 60);
      const totalSecondsRemaining = Math.floor(newUsedDuration % 60);
      setTotalDuration(
        `${totalMinutes}:${totalSecondsRemaining < 10 ? '0' : ''}${totalSecondsRemaining}`,
      );
    };
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
    const selectedFormatData = formats.find((format) => format.id === Number(selectedFormat));
    if (selectedFormatData?.format === 'Single') {
      maxDuration = 10 * 60;
    } else if (selectedFormatData?.format === 'EP') {
      maxDuration = 20 * 60;
    } else if (selectedFormatData?.format === 'LP') {
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

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: isMobile ? '20px' : '80px',
        backgroundImage: `url(/static/img/fon.gif)`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100%',
        // minWidth: '100%'
      }}
    >
      <Box
        sx={{
          padding: isMobile ? '10px' : '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          border: 'solid 2px #00FEFC',
          marginTop: '50px'
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
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
                  width: isMobile ? '300px' : '500px',
                  background: `url(${mainImagePath}) no-repeat center center / contain`,
                  animation: 'spin 7s linear infinite',
                }}
              >
                {croppedImage && (
                  <CardMedia
                    component="img"
                    image={croppedImage.fileUrl}
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
                {additionalImagePath && (
                  <CardMedia
                    component="img"
                    image={additionalImagePath}
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
              <ImageUploadAndCrop vinylImage={mainImagePath} onSave={handleSaveCroppedImage} />
              <Box component="form" onSubmit={OrderHandleSubmit}>
                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="format-label">Формат пластинки</InputLabel>
                  <Select
                    labelId="format-label"
                    id="format"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    label="Формат пластинки"
                  >
                    {formats.toReversed().map((format) => (
                      <MenuItem key={format.id} value={format.id}>
                        {format.format}
                      </MenuItem>
                    ))}
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
                      maxHeight: '300px', // Устанавливаем максимальную высоту
                      overflowY: 'auto', // Добавляем прокрутку
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
                ) : null}

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
                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-quantity">Количество</InputLabel>
                  <OutlinedInput
                    type="number"
                    id="outlined-adornment-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    label="Количество"
                    inputProps={{ min: 1 }}
                  />
                </FormControl>
                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-quantity">Номер телефона</InputLabel>
                  <OutlinedInput
                    type="tel"
                    id="outlined-adornment-quantity"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    label="Номер телефона"
                  />
                </FormControl>
                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="delieveryAdress-label">Выберите вариант доставки:</InputLabel>
                  <Select
                    labelId="format-delieveryAdress-label"
                    id="delieveryAdress"
                    value={typeShop}
                    onChange={(e) => setTypeShop(e.target.value)}
                    label="Вариант доставки"
                  >
                    <MenuItem value="Доставка">Доставка</MenuItem>
                    <MenuItem value="Самовывоз">Самовывоз</MenuItem>
                  </Select>
                </FormControl>
                {typeShop === 'Доставка' && (
                  <FormControl>
                    <InputLabel>Адрес доставки</InputLabel>
                    <OutlinedInput
                      type="string"
                      value={delieveryAddress}
                      onChange={(e) => setDelieveryAddress(e.target.value)}
                    />
                  </FormControl>
                )}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
                    Оформить Заказ
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
