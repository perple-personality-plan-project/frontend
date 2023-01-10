import React, { useState } from 'react';

const ImagePreviewHook = () => {
  const [imageSrc, setImageSrc] = useState('');

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const reader: any = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    return new Promise((resolve: any) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return { imageSrc, setImageSrc, handleImagePreview };
};

export default ImagePreviewHook;
