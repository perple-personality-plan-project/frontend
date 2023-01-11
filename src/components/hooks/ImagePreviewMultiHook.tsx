import React, { useState } from 'react';

interface preset {
  imageSrc: any[];
}

const ImagePreviewMultiHook = () => {
  const [imageSrc, setImageSrc] = useState<preset['imageSrc']>([]);

  let fileURLs: any[] = [];
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    for (let i = 0; i < e.target.files.length; i++) {
      const reader: any = new FileReader();
      reader.readAsDataURL(e.target.files[i]);

      reader.onload = () => {
        console.log(reader.result);
        fileURLs[i] = { id: i, data: reader.result, toggle: false };
        setImageSrc([...fileURLs]);
      };
    }
  };

  return { imageSrc, setImageSrc, handleImagePreview };
};

export default ImagePreviewMultiHook;
