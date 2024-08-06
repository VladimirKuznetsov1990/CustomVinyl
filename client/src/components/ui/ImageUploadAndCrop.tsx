import React, { useState, useCallback } from 'react';
import { Box, Slider, Button, Typography } from '@mui/material';
import Cropper, { type Area } from 'react-easy-crop';
import { getCroppedImg } from '../../hooks/cropImage';

type ImageUploadAndCropProps = {
  onSave: (image: string) => void;
  vinylImage: string;
};

export default function ImageUploadAndCrop({
  vinylImage,
  onSave,
}: ImageUploadAndCropProps): JSX.Element {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [openCropper, setOpenCropper] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState<string | null>(null);
  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPix: Area) => {
    setCroppedAreaPixels(croppedAreaPix);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleApply = (): void => {
    if (imageSrc && croppedAreaPixels) {
      getCroppedImg(imageSrc, croppedAreaPixels)
        .then((croppedImage) => {
          setCroppedImageSrc(croppedImage);
          onSave(croppedImage);
          setOpenCropper(false);
        })
        .catch((error) => {
          console.error('Ошибка при обрезке изображения:', error);
        });
    }
  };

  return (
    <Box mb={2}>
      <Button variant="contained" color="primary" fullWidth onClick={() => setOpenCropper(true)}>
        <input
          style={{ position: 'absolute', inset: 0, border: 'none', background: 'none', opacity: 0}}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        Добавить изображение
      </Button>
      {imageSrc && openCropper && (
        <Box>
          <div style={{ position: 'relative', width: 500, height: 500 }}>
            <img
              src={vinylImage}
              alt="Vinyl"
              style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0 }}
            />
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  minWidth: '100%',
                  minHeight: '100%',
                  opacity: '1',
                },
                cropAreaStyle: {
                  borderRadius: '50%',
                },
              }}
            />
            <div
              style={{
                position: 'absolute',
                height: 700,
                width: 700,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
          </div>
          <Box>
            <Typography>Zoom</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(_, onzoom) => setZoom(Number(onzoom))}
            />
          </Box>
        </Box>
      )}
      {imageSrc && openCropper && (
        <Box>
          <Button variant="contained" color="primary" onClick={() => handleApply()}>Применить</Button>
        </Box>
      )}
    </Box>
  );
}
