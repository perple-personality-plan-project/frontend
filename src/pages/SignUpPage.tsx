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

  const [validationId, setValidationId] = useState(false);
  const [validationNick, setValidationNick] = useState(false);
  const [validationPW, setValidationPW] = useState(false);
  const [validationPW2, setValidationPW2] = useState(false);
  const [validationMBTI, setValidationMBTI] = useState(false);

  const [idConfirm, setIdConfirm] = useState(false);
  const [nickConfirm, setNickConfirm] = useState(false);

  const onLoginIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdConfirm(false);
    setLoginId(e.currentTarget.value);
    setIdFlag(false);
    const RegExpId = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,10}$/;
    if (!RegExpId.test(e.target.value)) {
      setValidationId(false);
      setIdMessage('???????????? ????????? + ????????? ???????????? 5-10?????? ??????????????????!');
    } else {
      setIdMessage('????????? ??????????????? ????????????!');
      setValidationId(true);

      // setIdMessage('???');
    }
  };

  // console.log(idConfirm, IdMessage);

  const onNickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickConfirm(false);
    setNickName(e.currentTarget.value);
    setNickFlag(false);
    const RegExpNick = /^[???-???a-zA-Z]{4,8}$/;
    if (!RegExpNick.test(e.target.value)) {
      setValidationNick(false);
      setNickNameMessage('???????????? ?????? ?????? ?????? 4-8?????? ??????????????????!');
    } else {
      setValidationNick(true);
      setNickNameMessage('????????? ??????????????? ????????????!');
      // setIdMessage('???');
    }
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    const RegExpPw =
      /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{4,10}$/;
    if (!RegExpPw.test(e.target.value)) {
      setValidationPW(false);
      setPwMessage(
        '??????????????? ????????? + ?????? + ????????????(!,@,#,$,%)??? ??????????????????!',
      );
    } else {
      setValidationPW(true);
      setPwMessage('??? ??????????????? ?????? ??? ??? ????????????!');
      // setIdMessage('???');
    }
  };

  useEffect(() => {
    if (Password !== ConfirmPassword) {
      setValidationPW2(false);
      // setPwMessage()
      setPwConfirmMessage('??? ??????????????? ???????????? ????????????!');
    } else {
      setValidationPW2(true);
      setPwConfirmMessage('??? ??????????????? ???????????????!');
    }
  }, [ConfirmPassword, Password]);

  const onMbtiHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMbti(e.currentTarget.value);

    if (!mbtiList.includes(e.target.value.toUpperCase())) {
      setValidationMBTI(false);
      setMbtiMessage('mbti??? ????????? ??????????????????!');
    } else {
      setValidationMBTI(true);
      setMbtiMessage('??????!');
      // setIdMessage('???');
    }
  };

  const signUp = async (payload: any) => {
    try {
      await nonTokenClient.post('api/user/signup', payload);
      alert('?????? ?????? ??????!');
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
    const RegExpNick = /^[???-???a-zA-Z]{4,8}$/;
    const RegExpPw =
      /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{4,10}$/;

    if (!RegExpId.test(LoginId)) {
      alert('???????????? ????????? + ????????? ???????????? 5-10?????? ??????????????????!');
    } else if (!RegExpNick.test(NickName)) {
      alert('???????????? ?????? ?????? ?????? 4-8?????? ??????????????????!');
    } else if (!RegExpPw.test(Password)) {
      alert('??????????????? ????????? + ?????? + ????????????(!,@,#,$,%)??? ??????????????????!');
    } else if (Password !== ConfirmPassword) {
      alert('??????????????? ???????????? ????????? ?????? ????????????!');
    } else if (idFlag === false) {
      alert('????????? ??????????????? ??????????????????!');
    } else if (nickFlag === false) {
      alert('????????? ??????????????? ??????????????????!');
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
      alert('MBTI??? ????????? ??????????????????!');
    }
  };

  const checkIdFromServer = async () => {
    try {
      await nonTokenClient.post('api/user/check-id', {
        login_id: LoginId,
      });
      setIdConfirm(true);
      setIdFlag(true);
      alert('?????? ????????? ????????? ?????????!');
    } catch (error: any) {
      setIdConfirm(false);
      if (error.response.status === 409) {
        setIdFlag(false);
        alert(error.response.data.message);
      } else {
        alert('???????????? ????????? ?????? ??????????????????!');
      }
    }
  };

  const checkNickNameFromServer = async () => {
    try {
      await nonTokenClient.post('api/user/check-nick', {
        nickname: NickName,
      });
      setNickConfirm(true);
      setNickFlag(true);
      alert('?????? ????????? ????????? ?????????!');
    } catch (error: any) {
      if (error.response.status === 409) {
        setNickFlag(false);
        alert(error.response.data.message);
      } else {
        alert('???????????? ????????? ?????? ??????????????????!');
      }
    }
  };
  // console.log(idConfirm);

  const checkId = () => {
    checkIdFromServer();
    // console.log(idConfirm);
  };

  const checkNickName = () => {
    checkNickNameFromServer();
  };

  return (
    <Wrap>
      <Title>
        <div className="title">?????? ?????? ??? ?????????!</div>
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
            <Label>????????? </Label>
            <Input
              required
              type="text"
              value={LoginId}
              onChange={onLoginIdHandler}
              placeholder="?????????"
              maxLength={10}
            />
            {LoginId ? (
              !idConfirm ? (
                <p className="validation-fail">{IdMessage}</p>
              ) : (
                <p
                  className={
                    validationId ? 'validation-complete' : 'validation-fail'
                  }
                >
                  {'????????? ??????????????? ?????????????????????!'}
                </p>
              )
            ) : null}
          </div>
          <StButton
            style={{ width: '101.47px' }}
            type="button"
            onClick={checkId}
          >
            <div>???????????????</div>
          </StButton>
        </div>

        {/* <div className="form-input">
          <Label>?????????</Label>
          <Input
            required
            type="text"
            value={LoginId}
            onChange={onLoginIdHandler}
            placeholder="?????????"
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
            <Label>????????? </Label>
            <Input
              required
              type="text"
              value={NickName}
              onChange={onNickNameHandler}
              placeholder="?????????"
              maxLength={8}
            />
            {NickName ? (
              !nickConfirm ? (
                <p className="validation-fail">{nickNameMessage}</p>
              ) : (
                <p
                  className={
                    validationNick ? 'validation-complete' : 'validation-fail'
                  }
                >
                  {'????????? ??????????????? ?????????????????????!'}
                </p>
              )
            ) : null}
          </div>
          <StButton
            style={{ width: '101.47px' }}
            type="button"
            onClick={checkNickName}
          >
            <div>???????????????</div>
          </StButton>
        </div>

        {/* <div className="form-input">
          <Label>?????????</Label>
          <Input
            // pattern="^[???-???a-zA-Z]{4,8}$"
            required
            type="text"
            value={NickName}
            onChange={onNickNameHandler}
            placeholder="?????????"
            maxLength={8}
          />
          {NickName ? (
            <p className="validation-text">{nickNameMessage}</p>
          ) : null}
        </div> */}

        <div className="form-input">
          <Label>????????????</Label>
          <Input
            // pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%]{4,10}$"
            required
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="????????????"
            maxLength={50}
          />
          {Password ? (
            <p
              className={
                validationPW ? 'validation-complete' : 'validation-fail'
              }
            >
              {PwMessage}
            </p>
          ) : null}
        </div>
        <div className="form-input">
          <Label>???????????? ??????</Label>
          <Input
            // pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%]{4,10}$"
            required
            type="password"
            value={ConfirmPassword}
            onChange={e => setConfirmPassword(e.currentTarget.value)}
            placeholder="???????????? ??????"
            maxLength={50}
          />
          {ConfirmPassword ? (
            <p
              className={
                validationPW2 ? 'validation-complete' : 'validation-fail'
              }
            >
              {PwConfirmMessage}
            </p>
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
              placeholder="MBTI??? ???????????????"
              maxLength={4}
            />
            {Mbti ? (
              <p
                className={
                  validationMBTI ? 'validation-complete' : 'validation-fail'
                }
              >
                {mbtiMessage}
              </p>
            ) : null}
          </div>
          <StButton
            type="button"
            onClick={() => window.open('/mbti', '_blank')}
          >
            <div>?????????????????????</div>
          </StButton>
        </div>
        <ButtonWrap>
          <Button>?????? ???????????????!</Button>
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

  .validation-complete {
    font-size: 12px;
    color: #644eee;
    margin: 5px 0 0 5px;
  }

  .validation-fail {
    font-size: 12px;
    color: red;
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

  :focus {
    outline: 0;
    box-shadow: 0 0 5px 1px #644eee;
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

  :focus {
    outline: 0;
    box-shadow: 0 0 5px 1px #644eee;
  }

  @media screen and (max-width: 700px) {
    margin-top: 10px;
  }
  /* :hover {
    opacity: 0.75;
  } */
`;

export default SignUpPage;
