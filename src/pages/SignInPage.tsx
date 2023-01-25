import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import nonTokenClient from '../api/noClient';

const SignInPage = () => {
  const [LoginId, setLoginId] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLoginIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.currentTarget.value);
  };
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const login = async () => {
    try {
      const { data } = await nonTokenClient.post('api/user/login', {
        login_id: LoginId,
        password: Password,
      });

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('mbti', data.data.mbti);

      alert('로그인 성공');
      navigate('/community');
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const kakaoLogin = async () => {
    const Redirect_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const Client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Client_id}&redirect_uri=${Redirect_URI}`;
  };

  return (
    <Wrap>
      <Title>
        <span>Platter</span>
        <div className="title">서비스 이용을 위한 로그인을 해주세요!</div>
      </Title>
      <FormWrap>
        <Input
          width="366px"
          height="20px"
          placeholder="ID를 입력하세요."
          onChange={onLoginIdHandler}
          required
        />

        <Input
          width="366px"
          height="20px"
          placeholder="비밀번호를 입력하세요."
          onChange={onPasswordHandler}
          type="password"
          required
        />
        <ButtonWrap>
          <div className="gathered">
            <ButtonLogin className="login" type="button" onClick={login}>
              로그인
            </ButtonLogin>
            <ButtonSignUp
              className="signup"
              type="button"
              onClick={() => navigate(`/signup`)}
            >
              회원가입
            </ButtonSignUp>
          </div>
          <ButtonKakao
            onClick={kakaoLogin}
            style={{ height: '40px', marginTop: '15%' }}
          >
            <i
              style={{ fontSize: '20px', paddingRight: '5px' }}
              className="ri-kakao-talk-fill"
            ></i>
            카카오로 로그인하기
          </ButtonKakao>
        </ButtonWrap>
      </FormWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;

  margin: 0 auto;
  @media screen and (max-width: 412px) {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.span`
  font-size: 40px;
  font-weight: 700;
  .title {
    font-size: 20px;
    font-weight: 300;
    margin: 40px 0 30px 0;
    color: gray;
  }
`;

const FormWrap = styled.form`
  width: 90%;
  height: fit-content;
  border-radius: 18px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const Input = styled.input`
  outline: 0;
  text-indent: 10px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 50px;
  padding: 11px 16px;
  min-width: 120px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonWrap = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: '20vw';
  height: '10vh';

  .gathered {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 15px;
  }

  @media screen and (max-width: 412px) {
    .gathered {
      display: flex;
      flex-direction: row;
    }
  }
`;

const ButtonLogin = styled.button`
  /* width: 215px; */
  width: 100%;
  height: 40px;
  cursor: pointer;

  border-radius: 50px;
  border: none;

  background-color: #c4c9f6;
  color: white;

  &:hover {
    background-color: #644eee;
  }
`;

const ButtonSignUp = styled.button`
  /* width: 215px; */
  width: 100%;
  height: 40px;
  cursor: pointer;

  border-radius: 50px;
  border: none;

  background-color: #644eee;
  color: white;
`;

const ButtonKakao = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 215px; */
  width: 100%;
  height: 40px;
  cursor: pointer;

  border-radius: 50px;
  border: none;

  background-color: #fedf3c;
  color: black;
`;

export default SignInPage;
