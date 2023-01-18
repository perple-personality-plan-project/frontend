import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import nonTokenClient from '../api/noClient';

const SignInPage = () => {
  const [LoginId, setLoginId] = useState('');
  const [Password, setPassword] = useState('');

  const onLoginIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.currentTarget.value);
  };
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const login = async () => {
    const x = await nonTokenClient.post('/api/user/login', {
      login_id: LoginId,
      password: Password,
    });
    console.log(x);
    console.log('dd');
  };

  return (
    <Wrap>
      <Title>
        <span>Platter</span>
        <div className="title">서비스 이용을 위한 로그인을 해주세요!</div>
      </Title>
      <FormWrap>
        <Label></Label>
        <Input
          width="366px"
          height="20px"
          placeholder="ID를 입력하세요."
          onChange={onLoginIdHandler}
        />
        <Label></Label>
        <Input
          width="366px"
          height="20px"
          placeholder="비밀번호를 입력하세요."
          onChange={onPasswordHandler}
        />
        <ButtonWrap>
          <div className="gathered">
            <Button
              type="button"
              style={{ width: '200px', height: '40px' }}
              onClick={login}
            >
              로그인
            </Button>
            <Button style={{ width: '200px', height: '40px' }}>회원가입</Button>
          </div>
          <Button style={{ height: '40px', marginTop: '15%' }}>
            카카오로 로그인하기
          </Button>
        </ButtonWrap>
      </FormWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  @media screen and (max-width: 412px) {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin-top: 10%;
  }
`;

const Title = styled.span`
  font-size: 40px;
  font-weight: 700;
  .title {
    font-size: 20px;
    font-weight: 300;
    margin-top: 10%;
    color: gray;
  }
`;

const FormWrap = styled.form`
  width: fit-content;
  height: fit-content;
  /* border: 1px solid #ffffff; */
  border-radius: 18px;
  /* box-shadow: 1px 1px 3px 0px; */
  margin: 10px;
  padding: 0px 50px 90px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  line-height: 163.15%;
  font-weight: 500;
  color: grey;
  margin: 10px 0 0 5px;
`;

const Input = styled.input`
  border: none;
  background-color: #c7c6c6;
  border-radius: 50px;
  padding: 11px 16px;
  min-width: 120px;
  font-size: 16px;
`;

const ButtonWrap = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  width: '20vw';
  height: '10vh';
  justify-content: space-between;
  @media screen and (max-width: 412px) {
    .gathered {
      display: flex;
      flex-direction: row;
    }
  }
`;

const Button = styled.button`
  cursor: pointer;

  border-radius: 50px;
  border: none;
  :hover {
    opacity: 0.75;
  }
`;

export default SignInPage;
