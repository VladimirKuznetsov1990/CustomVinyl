// src/components/cropImage.ts
const getCroppedImg = (imageSrc: string, pixelCrop: any): Promise<string> => {
  const image = new Image();
  image.src = imageSrc;

  const vinylImage = new Image();
  vinylImage.src = '/img/disk2.png'; // Замените на путь к вашему изображению

  return new Promise((resolve, reject) => {
    image.onload = () => {
      vinylImage.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context is not available'));
          return;
        }

        // Настройка размера холста
        const canvasSize = Math.max(pixelCrop.width, vinylImage.height);
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        // Обрезка изображения
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          canvasSize,
          canvasSize,
        );

        // Наложение винилового диска
        // ctx.drawImage(vinylImage, 0, 0, canvasSize, canvasSize);

        // Получение Blob из Canvas
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          const fileUrl = window.URL.createObjectURL(blob);
          resolve(fileUrl);
        }, 'image/jpeg');
      };

      vinylImage.onerror = () => reject(new Error('Failed to load vinyl image'));
    };

    image.onerror = () => reject(new Error('Failed to load image'));
  });
};

export { getCroppedImg };
