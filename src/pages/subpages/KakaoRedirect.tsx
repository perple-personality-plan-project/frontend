import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import nonTokenClient from '../../api/noClient';
import Spinner from '../../components/images/spinner/Spinner-1s-200px.gif';

const KakaoRedirect = () => {
  const kakaoCode = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  const kakaoCall = async () => {
    try {
      const { data } = await nonTokenClient.get(
        `/api/user/auth/kakao?code=${kakaoCode}`,
      );
      sessionStorage.setItem('accessToken', data.data.accessToken);
      sessionStorage.setItem('refreshToken', data.data.refreshToken);
      sessionStorage.setItem('userId', data.data.user_id);
      if (!data.data.mbti) {
        navigate('/mbtikakao');
      } else {
        sessionStorage.setItem('mbti', data.data.mbti);
        navigate('/');
      }
    } catch (error) {
      alert('서버가 불안정합니다');
    }
  };

  useEffect(() => {
    kakaoCall();
  }, []);
  return (
    <StBackground>
      <StLoadingText>카카오 연결중 </StLoadingText>
      <img
        src={Spinner}
        alt="로딩중"
        style={{ width: '5%', minWidth: '50px' }}
      />
    </StBackground>
  );
};

export default KakaoRedirect;

const StBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLoadingText = styled.div`
  font: 1rem 'Nanum_B';
  text-align: center;
`;
