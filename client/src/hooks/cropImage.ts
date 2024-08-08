// src/components/cropImage.ts
export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CroppedImageResult = {
  fileUrl: string;
  file: File;
};

const getCroppedImg = (imageSrc: string, pixelCrop: PixelCrop): Promise<CroppedImageResult> => {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context is not available'));
        return;
      }

      // Настройка размера холста
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // Обрезка изображения
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      // Получение Blob из Canvas
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        const fileUrl = window.URL.createObjectURL(blob);
        resolve({ fileUrl, file });
      }, 'image/jpeg');
    };

    image.onerror = () => reject(new Error('Failed to load image'));
  });
};

export default getCroppedImg;
