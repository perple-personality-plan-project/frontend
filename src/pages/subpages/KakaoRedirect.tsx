import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import nonTokenClient from '../../api/noClient';

const KakaoRedirect = () => {
  const kakaoCode = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  const kakaoCall = async () => {
    const { data } = await nonTokenClient.get(
      `/api/user/auth/kakao?code=${kakaoCode}`,
    );
    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
    localStorage.setItem('userId', data.data.user_id);
    navigate('/');
  };

  useEffect(() => {
    kakaoCall();
  }, []);
  return <div>KakaoRedirect</div>;
};

export default KakaoRedirect;
