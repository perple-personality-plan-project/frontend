import React, { useEffect } from 'react';
import nonTokenClient from '../../api/noClient';

const KakaoRedirect = () => {
  const kakaoCode = new URL(window.location.href).searchParams.get('code');

  const kakaoCall = async () => {
    const data = await nonTokenClient.get(
      `/api/user/auth/kakao?code=${kakaoCode}`,
    );
    console.log(data);
  };

  useEffect(() => {
    kakaoCall();
  }, []);
  return <div>KakaoRedirect</div>;
};

export default KakaoRedirect;
