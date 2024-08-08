import React, { useCallback, useEffect, useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getFormatVinylThunk } from '../../redux/slices/formatVinyl/formatVinylThunk';
import { addOrderThunk } from '../../redux/slices/order/orderThunk';
import ImageUploadAndCrop from '../ui/ImageUploadAndCrop';
import { setCroppedImage } from '../../redux/slices/image/imageSlice';
import { closeModal, openModal } from '../../redux/slices/modal/modalSlice';
import AudioPlayer from '../ui/AudioPlayer';
import '../style/styles-order.css';
import AddressModal from '../ui/AddressModal';
import { setDeliveryAddress } from '../../redux/slices/order/orderSlice';
import ErrorSnackbar from '../ui/ErrorSnackbar'; // Импортируем ErrorSnackbar
import { type OrderData } from '../../types/orderTypes';

export default function OrderPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.userStatus);
  const [quantity, setQuantity] = useState(1); // Количество пластинок
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedColor, setSelectedColor] = useState('Стандарт');
  const [totalPrice, setTotalPrice] = useState(0); // Общая стоимость
  const [audioFiles, setAudioFiles] = useState<File[]>([]); // Файлы аудио
  const [audioDurations, setAudioDurations] = useState<string[]>([]); // Длительности аудио
  const [totalDuration, setTotalDuration] = useState<string>('00:00'); // Общее время всех треков в формате MM:SS
  const [availableDuration, setAvailableDuration] = useState(0); // Доступное время в секундах
  const [usedDuration, setUsedDuration] = useState(0); // Использованное время в секундах
  const [typeShop, setTypeShop] = useState<string>('Самовывоз');
  const [phone, setPhone] = useState<string>('');
  const isAddressModalOpen = useAppSelector((state) => state.modal.address);
  const deliveryAddress = useAppSelector((state) => state.order.deliveryAddress);
  const croppedImage = useAppSelector((store) => store.image.croppedImage); // кропнутое изображение
  const formats = useAppSelector((store) => store.format.data);
  const [selectedFormatDescription, setSelectedFormatDescription] = useState('');

  const handleOpenAddressModal = (): void => {
    dispatch(openModal({ modalType: 'address' }));
  };

  const handleCloseAddressModal = (): void => {
    dispatch(closeModal('address'));
  };

  const handleSaveAddress = (address: string): void => {
    dispatch(setDeliveryAddress(address));
  };

  useEffect(() => {
    void dispatch(getFormatVinylThunk());
  }, [dispatch]);

  useEffect(() => {
    if (formats.length > 0) {
      const defaultFormat = formats.find((format) => format.format === 'Single');
      if (defaultFormat) {
        setSelectedFormat(defaultFormat.id.toString());
        setSelectedFormatDescription(defaultFormat.description);
      }
    }
  }, [formats]);

  const getImagePaths = (color: string): { mainImagePath: string; additionalImagePath: string } => {
    let mainImagePath = '';
    let additionalImagePath = '';

    switch (color) {
      case 'Красный':
        mainImagePath = '/static/img/Vinyl_red.png';
        additionalImagePath = '/static/img/Vinyl+Red_mid.png';
        break;
      case 'Синий':
        mainImagePath = '/static/img/Vinyl_blue.png';
        additionalImagePath = '/static/img/Vinyl+Blue_mid.png';
        break;
      case 'Зеленый':
        mainImagePath = '/static/img/Vinyl_green.png';
        additionalImagePath = '/static/img/Vinyl+Green_mid.png';
        break;
      case 'Стандарт':
        mainImagePath = '/static/img/1Vinyl+.png';
        additionalImagePath = '/static/img/Vinyl+Custom_mid.png';
        break;
      case 'Фиолетовый':
        mainImagePath = '/static/img/VinylsPurple1.png';
        additionalImagePath = '/static/img/VinylsPurple2.png';
        break;
      case 'Оранжевый':
        mainImagePath = '/static/img/VinylsOrange1.png';
        additionalImagePath = '/static/img/VinylsOrange2.png';
        break;
      case 'Желтый':
        mainImagePath = '/static/img/VinylsYellow1.png';
        additionalImagePath = '/static/img/VinylsYellow2.png';
        break;
      case 'Серебряный':
        mainImagePath = '/static/img/VinylsWhite1.png';
        additionalImagePath = '/static/img/VinylsWhite2.png';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSaveCroppedImage = (image: { file: string | File; fileUrl: string }): void => {
    dispatch(setCroppedImage(image));
  };

  const createOrderFormData = (data: OrderData): FormData => {
    const formData = new FormData();

    formData.append('userId', `${data.userId}`);
    formData.append('status', data.status);
    formData.append('totalPrice', `${data.totalPrice}`);
    formData.append('formatId', `${data.formatId}`);
    formData.append('color', data.color);
    formData.append('quantity', `${data.quantity}`);
    formData.append('userName', data.userName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('address', data.address);

    if (data.userImg) {
      formData.append('userImg', data.userImg);
    } else {
      formData.append('userImg', '');
    }

    if (data.tracks && data.tracks.length > 0) {
      data.tracks.forEach((file) => {
        formData.append('tracks', file);
      });
    } else {
      formData.append('tracks', '');
    }

    return formData;
  };

  const handleOrderSubmit = async (): Promise<void> => {
    if (!user || !user.id) {
      dispatch(openModal({ modalType: 'authRequired' }));
      return;
    }

    if (!phone) {
      dispatch({
        type: 'auth/setError',
        payload: 'Поле "Номер телефона" обязательно для заполнения',
      });
      return;
    }

    const { userName, email } = user;
    const orderData: OrderData = {
      userId: `${user.id}`,
      status: 'Новый',
      totalPrice: totalPrice.toString(),
      formatId: selectedFormat,
      color: selectedColor,
      quantity: quantity.toString(),
      userName: userName?.toString() || '',
      email: email?.toString() || '',
      phone: phone.toString(),
      address: deliveryAddress,
      userImg: croppedImage ? croppedImage.file : undefined,
      tracks: Array.from(audioFiles),
    };

    const formData = createOrderFormData(orderData);

    try {
      await dispatch(addOrderThunk(formData));
      dispatch(openModal({ modalType: 'orderSuccess' }));
    } catch (error) {
      console.error('Error adding order:', error);
      dispatch({ type: 'auth/setError', payload: 'Не удалось добавить заказ.' });
    }
  };

  const calculateTotalPrice = useCallback((): void => {
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
  }, [selectedColor, selectedFormat, formats, quantity]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

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
      dispatch({
        type: 'auth/setError',
        payload: 'Превышено допустимое время для выбранного формата',
      });
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
  }, [selectedFormat, formats]);

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
        padding: isMobile ? '20px' : '40px',
        backgroundImage: `url(/static/img/fon.gif)`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <Box
        sx={{
          padding: isMobile ? '10px' : '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          border: 'solid 2px #00FEFC',
          marginTop: '50px',
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
              <FormControl variant="outlined" fullWidth className="custom-form-control">
                <InputLabel id="color-label">Цвет</InputLabel>
                <Select
                  labelId="color-label"
                  id="color-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  label="Цвет"
                >
                  <MenuItem value="Стандарт">Стандарт</MenuItem>
                  <MenuItem value="Красный">Красный</MenuItem>
                  <MenuItem value="Синий">Синий</MenuItem>
                  <MenuItem value="Зеленый">Зеленый</MenuItem>
                  <MenuItem value="Фиолетовый">Фиолетовый</MenuItem>
                  <MenuItem value="Оранжевый">Оранжевый</MenuItem>
                  <MenuItem value="Желтый">Желтый</MenuItem>
                  <MenuItem value="Серебряный">Серебряный</MenuItem>
                </Select>
              </FormControl>
              <ImageUploadAndCrop vinylImage={mainImagePath} onSave={handleSaveCroppedImage} />
              <Box>
                <FormControl variant="outlined" fullWidth className="custom-form-control">
                  <InputLabel id="format-label">Формат пластинки</InputLabel>
                  <Select
                    labelId="format-label"
                    id="format"
                    value={selectedFormat}
                    onChange={(e) => {
                      const selectedFormatId = e.target.value;
                      setSelectedFormat(selectedFormatId);
                      const selectedFormatData = formats.find(
                        (format) => format.id === Number(selectedFormatId),
                      );
                      if (selectedFormatData) {
                        setSelectedFormatDescription(selectedFormatData.description);
                      }
                    }}
                    label="Формат пластинки"
                  >
                    {formats.toReversed().map((format) => (
                      <MenuItem key={format.id} value={format.id}>
                        {format.format}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedFormatDescription && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {selectedFormatDescription}
                  </Typography>
                )}
                <Box mt={2}>
                  <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                    <input
                      id="audio-file-input"
                      type="file"
                      accept="audio/*, .m4r,.mp3,.acc"
                      style={{ display: 'none' }}
                      onChange={handleFileInputChange}
                      multiple
                    />
                    <Button
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
                        color: '#fff', // Белый текст
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
                        },
                      }}
                      variant="contained"
                      component="label"
                      htmlFor="audio-file-input"
                    >
                      Выберите аудио файлы
                    </Button>
                  </FormControl>
                </Box>
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
                      <TableBody>
                        {audioFiles.map((file, index) => (
                          <TableRow key={file.name}>
                            <TableCell>
                              <AudioPlayer file={file} />
                            </TableCell>
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
                <FormControl variant="outlined" fullWidth className="custom-form-control">
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
                <FormControl variant="outlined" fullWidth className="custom-form-control">
                  <InputLabel htmlFor="outlined-adornment-quantity">Номер телефона*</InputLabel>
                  <OutlinedInput
                    type="tel"
                    id="outlined-adornment-quantity"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    label="Номер телефона"
                  />
                </FormControl>
                <FormControl variant="outlined" fullWidth className="custom-form-control">
                  <InputLabel id="delieveryAdress-label">Способ получения:</InputLabel>
                  <Select
                    labelId="format-delieveryAdress-label"
                    id="delieveryAdress"
                    value={typeShop}
                    onChange={(e) => setTypeShop(e.target.value)}
                    label="Способ получения"
                  >
                    <MenuItem value="Доставка">Доставка</MenuItem>
                    <MenuItem value="Самовывоз">Самовывоз</MenuItem>
                  </Select>
                </FormControl>
                {typeShop === 'Доставка' && (
                  <Box>
                    <Typography variant="h6">Адрес доставки:</Typography>
                    <Typography mb={2}>{deliveryAddress}</Typography>
                    <Button
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
                        color: '#fff', // Белый текст
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 1 )', // Изменение прозрачности при наведении
                        },
                      }}
                      variant="contained"
                      onClick={handleOpenAddressModal}
                    >
                      Добавить адрес
                    </Button>
                  </Box>
                )}
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Button
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
                      color: '#fff', // Белый текст
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 1 )', // Изменение прозрачности при наведении
                      },
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => void handleOrderSubmit()}
                  >
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
      <AddressModal
        open={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onSave={handleSaveAddress}
      />
      <ErrorSnackbar /> {/* Добавляем ErrorSnackbar в основной компонент */}
    </Container>
  );
}
