import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import '../style/styles-order.css';

type AddressModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (address: string) => void;
};

export default function AddressModal({ open, onClose, onSave }: AddressModalProps): JSX.Element {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [corp, setCorp] = useState('');
  const [kv, setKv] = useState('');

  const handleSave = (): void => {
    const fullAddress = `Город: ${city}, улица: ${street}, дом: ${house}, корп: ${corp}, кв: ${kv}`;
    onSave(fullAddress);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 0 }}>Адрес доставки</DialogTitle>
      <Box
        mt={2}
        display="flex"
        flexDirection="column"
        margin="15px"
        sx={{
          width: { xs: '3 00px', sm: '500px' },
          height: { xs: 'auto', sm: '480px' },
        }}
      >
        <TextField
          label="Город"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ mb: 1 }}
          className="custom-form-control"
        />
        <TextField
          label="Улица"
          variant="outlined"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          sx={{ mb: 1 }}
          className="custom-form-control"
        />
        <TextField
          label="Дом"
          variant="outlined"
          value={house}
          onChange={(e) => setHouse(e.target.value)}
          sx={{ mb: 1 }}
          className="custom-form-control"
        />
        <TextField
          label="Корпус"
          variant="outlined"
          value={corp}
          onChange={(e) => setCorp(e.target.value)}
          sx={{ mb: 1 }}
          className="custom-form-control"
        />
        <TextField
          label="Квартира"
          variant="outlined"
          value={kv}
          onChange={(e) => setKv(e.target.value)}
          className="custom-form-control"
        />
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            marginRight: '8px',
            marginBottom: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Прозрачный черный цвет
            color: '#fff', // Белый текст
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 1)', // Изменение прозрачности при наведении
            },
            mt: 2,
            mb: 2,
          }}
        >
          Сохранить
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
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
          Отмена
        </Button>
      </Box>
    </Dialog>
  );
}
