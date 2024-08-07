import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';

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
      <DialogTitle sx={{ textAlign: 'center' }}>Адрес доставки</DialogTitle>
      <Box mt={5} display="flex" flexDirection="column" margin="15px" padding="15px">
        <TextField
          label="Город"
          variant='outlined'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Улица"
          variant='outlined'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          label="Дом"
          variant='outlined'
          value={house}
          onChange={(e) => setHouse(e.target.value)}
        />
        <TextField
          label="Корпус"
          variant='outlined'
          value={corp}
          onChange={(e) => setCorp(e.target.value)}
        />
          <TextField
          label="Квартира"
          variant='outlined'
          value={kv}
          onChange={(e) => setKv(e.target.value)}
        />
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
          Сохранить
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          Отмена
        </Button>
      </Box>
    </Dialog>
  );
}
