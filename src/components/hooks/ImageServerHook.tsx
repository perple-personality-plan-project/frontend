import React, { useState } from 'react';
import AWS from 'aws-sdk';

const ImageServerHook = () => {
  //   console.log(e.target.value);
  const BucketName = 'sblawsimage';
  const [thumbnail, setThumbnail] = useState('');

  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:08c52685-346d-4362-9490-8617a791432f', // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const handleFileAWS = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    console.log(e.target.files);
    setThumbnail(
      `https://sblawsimage.s3.ap-northeast-2.amazonaws.com/${file.name}`,
    );

    // S3 SDK에 내장된 업로드 함수
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: BucketName, // 업로드할 대상 버킷명
        Body: file, // 업로드할 파일 객체
        ContentType: file.type,
        Key: file.name, // 업로드할 파일명 (* 확장자를 추가해야 합니다!)
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        // alert('이미지 업로드에 성공했습니다.');
      },
      function (err) {
        return alert(`오류가 발생했습니다: ${err.message}`);
      },
    );
    return thumbnail;
  };

  return { thumbnail, handleFileAWS };
};

export default ImageServerHook;
