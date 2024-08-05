import React, { useState, useCallback } from 'react';
import { Box, Slider, Button, Typography } from '@mui/material';
import Cropper, { type Area } from 'react-easy-crop';
import { getCroppedImg } from '../../hooks/cropImage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addVinylThunk } from '../../redux/slices/vinyl/vinylThunk';
import type { VinylDataType } from '../../types/vinylTypes';
import { addOrderThunk } from '../../redux/slices/order/orderThunk';


// const vinylImage = '/disk2.png'

type ImageUploadAndCropProps = {
  onSave: (image: string) => void;
  vinylImage: () => string;
};

export default function ImageUploadAndCrop({
  vinylImage,
  onSave,
}: ImageUploadAndCropProps): JSX.Element {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [openCropper, setOpenCropper] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState<string | null>(null);

  const { loading, error } = useAppSelector((store) => store.vinyl)
  const dispatch = useAppDispatch();

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // const handleSave = async () => {
  //   if (imageSrc && croppedAreaPixels) {
  //     const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
  //     onSave(croppedImage);
  //   }
  // };

  const handleApply = async (): Promise<void> => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImageSrc(croppedImage);
      onSave(croppedImage);
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
              src={vinylImage()}
              alt="Vinyl"
              style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0 }}
            />
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
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
            <Typography>Rotation</Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(_, rotat) => setRotation(Number(rotat))}
            />
          </Box>
        </Box>
      )}
      {/* {croppedImageSrc && (
        <Box>
          <img
            src={croppedImageSrc}
            alt="Cropped"
            style={{
              display: 'block',
              margin: '10px auto',
              borderRadius: '50%',
              width: '200px',
              height: '200px',
              objectFit: 'cover',
            }}
          />
        </Box>
      )} */}
      {imageSrc && openCropper && (
        <Box>
          <Button onClick={handleApply}>Применить</Button>
        </Box>
      )}
      {/* {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>} */}
    </Box>
  );
}
