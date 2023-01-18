import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../components/hooks/typescripthook/hooks';
// import { __signUp } from '../redux/modules/userSlice';
import nonTokenClient from '../api/noClient';

export interface userPreset {
  loginId: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  mbti: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [LoginId, setLoginId] = useState('');
  const [NickName, setNickName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Mbti, setMbti] = useState('');

  const onLoginIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.currentTarget.value);
  };
  const onNickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };
  const onMbtiHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMbti(e.currentTarget.value);
  };
  const signUp = (payload: any) => {
    nonTokenClient.post('/api/user/signup', payload);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let body = {
      login_id: LoginId,
      nickname: NickName,
      password: Password,
      confirm_password: ConfirmPassword,
      mbti: Mbti,
      provider: 'local',
    };

    signUp(body);

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
    }
  };

  return (
    <Wrap>
      <Title>
        <div className="title">회원 가입 중 이네요!</div>
      </Title>
      <FormWrap onSubmit={onSubmitHandler}>
        <Label>아이디</Label>
        <Input
          pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,10}$"
          required
          type="text"
          value={LoginId}
          onChange={onLoginIdHandler}
          placeholder="아이디"
        />
        <Label>닉네임</Label>
        <Input
          pattern="^[가-힣a-zA-Z]{4,8}$"
          required
          type="text"
          value={NickName}
          onChange={onNickNameHandler}
          placeholder="닉네임"
        />
        <Label>비밀번호</Label>
        <Input
          pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%]{4,10}$"
          required
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="비밀번호"
        />
        <Label>비밀번호 확인</Label>
        <Input
          pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%]{4,10}$"
          required
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          placeholder="비밀번호 확인"
        />
        <Label>MBTI </Label>
        <div>
          <Input
            required
            type="text"
            value={Mbti}
            onChange={onMbtiHandler}
            placeholder="MBTI를 적어주세요"
            style={{ width: '366px', height: '18px' }}
          />
          <Button
            style={{
              height: '40px',
              borderRadius: '10px',
              color: 'white',
              marginLeft: '10px',
            }}
            onClick={() => navigate('/mbti')}
          >
            검사하러가기✔
          </Button>
        </div>
        <ButtonWrap>
          <Button style={{ width: '398px', height: '40px', marginTop: '7%' }}>
            모두 작성했어요!
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
  margin-top: 8%;

  @media screen and (max-width: 412px) {
    display: flex;
    /* text-align: center; */
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 500;
  .title {
    font-size: 20px;
    font-weight: 100;
    margin-top: 10%;
    color: #555454;
  }
`;

const FormWrap = styled.form`
  width: fit-content;
  height: fit-content;
  border-radius: 18px;
  margin: 10px;
  padding: 0px 50px 90px 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  @media screen and (max-width: 412px) {
    /* text-align: center; */
    display: flex;
    margin-right: 23%;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: bold;
  line-height: 163.15%;
  font-weight: 500;
  color: #484848;
  margin: 10px 0 0 5px;
`;

const Input = styled.input`
  width: 366px;
  height: 20px;
  border: none;
  background-color: #eeebeb;
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
  background-color: #bcbaba;
  border-radius: 50px;
  border: none;
  :hover {
    opacity: 0.75;
  }
`;

export default SignUpPage;
