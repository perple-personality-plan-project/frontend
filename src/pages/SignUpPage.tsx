import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../components/hooks/typescripthook/hooks';
// import { __signUp } from '../redux/modules/userSlice';
import nonTokenClient from '../api/noClient';
import axios from 'axios';

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
  const [IdMessage, setIdMessage] = useState('');
  const [NickName, setNickName] = useState('');
  const [nickNameMessage, setNickNameMessage] = useState('');
  const [Password, setPassword] = useState('');
  const [PwMessage, setPwMessage] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [PwConfirmMessage, setPwConfirmMessage] = useState('');
  const [Mbti, setMbti] = useState('');
  const [mbtiMessage, setMbtiMessage] = useState('');

  const [idFlag, setIdFlag] = useState(false);
  const [nickFlag, setNickFlag] = useState(false);

  const mbtiList = [
    'ENFJ',
    'ENTJ',
    'ENFP',
    'ENTP',
    'ESFP',
    'ESFJ',
    'ESTP',
    'ESTJ',
    'INFP',
    'INFJ',
    'INTP',
    'ISTP',
    'ISFP',
    'ISFJ',
    'ISTJ',
    'INTJ',
  ];

  const onLoginIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.currentTarget.value);
    setIdFlag(false);
    const RegExpId = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,10}$/;
    if (!RegExpId.test(e.target.value)) {
      setIdMessage('아이디는 영문자 + 숫자를 포함하여 5-10자를 포함해주세요!');
    } else {
      setIdMessage('성공!');
      // setIdMessage('✔');
    }
  };

  const onNickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
    setNickFlag(false);
    const RegExpNick = /^[가-힣a-zA-Z]{4,8}$/;
    if (!RegExpNick.test(e.target.value)) {
      setNickNameMessage('닉네임은 한글 또는 영어 4-8자를 포함해주세요!');
    } else {
      setNickNameMessage('성공!');
      // setIdMessage('✔');
    }
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    const RegExpPw =
      /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{4,10}$/;
    if (!RegExpPw.test(e.target.value)) {
      setPwMessage(
        '비밀번호는 영문자 + 숫자 + 특수문자(!,@,#,$,%)를 포함해주세요!',
      );
    } else {
      setPwMessage('성공!');
      // setIdMessage('✔');
    }
  };

  useEffect(() => {
    if (Password !== ConfirmPassword) {
      // setPwMessage()
      setPwConfirmMessage('실패');
    } else {
      setPwConfirmMessage('성공');
    }
  }, [ConfirmPassword, Password]);

  const onMbtiHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMbti(e.currentTarget.value);

    if (!mbtiList.includes(e.target.value.toUpperCase())) {
      setMbtiMessage('mbti 제대로 입력해쥬세용');
    } else {
      setMbtiMessage('성공!');
      // setIdMessage('✔');
    }
  };

  const signUp = async (payload: any) => {
    try {
      await nonTokenClient.post('api/user/signup', payload);
      alert('회원 가입 성공!');
      navigate('/signin');
    } catch (error: any) {
      if (error.response.status === 409) {
        return alert(error.response.data.message);
      }
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const RegExpId = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,10}$/;
    const RegExpNick = /^[가-힣a-zA-Z]{4,8}$/;
    const RegExpPw =
      /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{4,10}$/;

    if (!RegExpId.test(LoginId)) {
      alert('아이디는 영문자 + 숫자를 포함하여 5-10자를 포함해주세요!');
    } else if (!RegExpNick.test(NickName)) {
      alert('닉네임은 한글 또는 영어 4-8자를 포함해주세요!');
    } else if (!RegExpPw.test(Password)) {
      alert('비밀번호는 영문자 + 숫자 + 특수문자(!,@,#,$,%)를 포함해주세요!');
    } else if (Password !== ConfirmPassword) {
      alert('비밀번호와 비밀번호 확인이 같지 않습니다!');
    } else if (idFlag === false) {
      alert('아이디 중복확인을 통과해주세요!');
    } else if (nickFlag === false) {
      alert('닉네임 중복확인을 통과해주세요!');
    } else if (mbtiList.includes(Mbti.toUpperCase())) {
      let body = {
        login_id: LoginId,
        nickname: NickName,
        password: Password,
        confirm_password: ConfirmPassword,
        mbti: Mbti.toUpperCase(),
        provider: 'local',
      };
      signUp(body);
    } else {
      alert('MBTI를 제대로 입력해주세요!');
    }
  };

  const checkIdFromServer = async () => {
    try {
      await nonTokenClient.post('api/user/check-id', {
        login_id: LoginId,
      });
      setIdFlag(true);
      alert('사용 가능한 아이디 입니다!');
    } catch (error: any) {
      if (error.response.status === 409) {
        setIdFlag(false);
        alert(error.response.data.message);
      } else {
        alert('아이디를 형식에 맞게 작성해주세요!');
      }
    }
  };

  const checkNickNameFromServer = async () => {
    try {
      await nonTokenClient.post('api/user/check-nick', {
        nickname: NickName,
      });
      setNickFlag(true);
      alert('사용 가능한 닉네임 입니다!');
    } catch (error: any) {
      if (error.response.status === 409) {
        setNickFlag(false);
        alert(error.response.data.message);
      } else {
        alert('닉네임을 형식에 맞게 작성해주세요!');
      }
    }
  };

  const checkId = () => {
    checkIdFromServer();
  };

  const checkNickName = () => {
    checkNickNameFromServer();
  };

  console.log(idFlag, nickFlag);

  return (
    <Wrap>
      <Title>
        <div className="title">회원 가입 중 이네요!</div>
      </Title>
      <FormWrap onSubmit={onSubmitHandler}>
        <div
          className="form-input"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            <Label>아이디 </Label>
            <Input
              required
              type="text"
              value={LoginId}
              onChange={onLoginIdHandler}
              placeholder="아이디"
              maxLength={10}
            />
            {LoginId ? <p className="validation-text">{IdMessage}</p> : null}
          </div>
          <StButton
            style={{ width: '101.47px' }}
            type="button"
            onClick={checkId}
          >
            <div>중복확인✔</div>
          </StButton>
        </div>

        {/* <div className="form-input">
          <Label>아이디</Label>
          <Input
            required
            type="text"
            value={LoginId}
            onChange={onLoginIdHandler}
            placeholder="아이디"
            maxLength={10}
          />
          {LoginId ? <p className="validation-text">{IdMessage}</p> : null}
        </div> */}

        <div
          className="form-input"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            <Label>닉네임 </Label>
            <Input
              required
              type="text"
              value={NickName}
              onChange={onNickNameHandler}
              placeholder="닉네임"
              maxLength={8}
            />
            {NickName ? (
              <p className="validation-text">{nickNameMessage}</p>
            ) : null}
          </div>
          <StButton
            style={{ width: '101.47px' }}
            type="button"
            onClick={checkNickName}
          >
            <div>중복확인✔</div>
          </StButton>
        </div>

        {/* <div className="form-input">
          <Label>닉네임</Label>
          <Input
            // pattern="^[가-힣a-zA-Z]{4,8}$"
            required
            type="text"
            value={NickName}
            onChange={onNickNameHandler}
            placeholder="닉네임"
            maxLength={8}
          />
          {NickName ? (
            <p className="validation-text">{nickNameMessage}</p>
          ) : null}
        </div> */}

        <div className="form-input">
          <Label>비밀번호</Label>
          <Input
            // pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%]{4,10}$"
            required
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="비밀번호"
            maxLength={50}
          />
          {Password ? <p className="validation-text">{PwMessage}</p> : null}
        </div>
        <div className="form-input">
          <Label>비밀번호 확인</Label>
          <Input
            // pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%]{4,10}$"
            required
            type="password"
            value={ConfirmPassword}
            onChange={e => setConfirmPassword(e.currentTarget.value)}
            placeholder="비밀번호 확인"
            maxLength={50}
          />
          {ConfirmPassword ? (
            <p className="validation-text">{PwConfirmMessage}</p>
          ) : null}
        </div>
        <div
          className="form-input"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            <Label>MBTI </Label>
            <Input
              required
              type="text"
              value={Mbti}
              onChange={onMbtiHandler}
              placeholder="MBTI를 적어주세요"
              maxLength={4}
            />
            {Mbti ? <p className="validation-text">{mbtiMessage}</p> : null}
          </div>
          <StButton
            type="button"
            onClick={() => window.open('/mbti', '_blank')}
          >
            <div>검사하러가기✔</div>
          </StButton>
        </div>
        <ButtonWrap>
          <Button>모두 작성했어요!</Button>
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
  height: 100vh;

  @media screen and (max-width: 412px) {
    /* display: flex; */
    /* text-align: center; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* margin: auto; */
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 30px;
  .title {
    font-size: 20px;
    font-weight: 100;
    margin-top: 10%;
    color: #555454;
  }
`;

const FormWrap = styled.form`
  width: 450px;
  height: fit-content;
  border-radius: 18px;
  margin: 10px;
  /* padding: 0px 50px 90px 140px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  .form-input {
    margin-bottom: 15px;
  }

  .validation-text {
    font-size: 12px;
    color: #644eee;
    margin: 5px 0 0 5px;
  }

  @media screen and (max-width: 500px) {
    width: 90%;
    /* display: flex; */
    /* margin: 0 5px; */
    /* margin-right: 23%; */
  }
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: bold;
  line-height: 163.15%;
  font-weight: 500;
  color: #484848;
  margin: 0 0 7px 0;
`;

const Input = styled.input`
  /* width: 366px; */
  /* box-sizing: border-box; */
  width: 100%;
  height: 20px;
  border: none;
  background-color: #eeebeb;
  border-radius: 50px;
  padding: 11px 0;
  /* min-width: 120px; */
  font-size: 16px;
  text-indent: 30px;
  outline: 0;
`;

const ButtonWrap = styled.div`
  /* padding-top: 20px; */
  display: flex;
  flex-direction: column;
  width: '20vw';
  height: '10vh';
  justify-content: space-between;
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: row;
  }
`;

const StButton = styled.button`
  background-color: white;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
  color: #644eee;
  border: 1px solid #644eee;
  border-radius: 10px;
  position: absolute;
  top: 32px;
  right: -125px;
  /* transform: translate(0, 50%); */

  :hover {
    background-color: #644eee;
    color: white;
    /* opacity: 0.75; */
  }

  @media screen and (max-width: 700px) {
    position: initial;
    margin-top: 10px;
    width: 150px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  color: white;
  background-color: #644eee;
  border-radius: 50px;
  border: none;
  height: 40px;
  margin-top: 20px;
  width: 100%;

  @media screen and (max-width: 700px) {
    margin-top: 10px;
  }
  /* :hover {
    opacity: 0.75;
  } */
`;

export default SignUpPage;
