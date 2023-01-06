import styled from 'styled-components';

const SignInPage = () => {
  return (
    <Wrap>
      <Title>
        <div className="title">회원 가입 중 이네요!</div>
      </Title>
      <FormWrap>
        <Label>아이디</Label>
        <Input width="366px" height="20px" placeholder="아이디" />
        <Label>닉네임</Label>
        <Input width="366px" height="20px" placeholder="닉네임" />
        <Label>비밀번호</Label>
        <Input width="366px" height="20px" placeholder="비밀번호" />
        <Label>비밀번호 확인</Label>
        <Input width="366px" height="20px" placeholder="비밀번호 확인" />
        <Label>MBTI</Label>
        <div>
          <Input width="366px" height="20px" placeholder="MBTI를 적어주세요" />
          <Button
            style={{ height: '40px', borderRadius: '5px', color: 'white' }}
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
  margin-top: 10%;

  @media screen and (max-width: 412px) {
    display: flex;
    /* text-align: center; */
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
`;

const Title = styled.span`
  font-size: 40px;
  font-weight: 600;
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
  line-height: 163.15%;
  font-weight: 500;
  color: #484848;
  margin: 10px 0 0 5px;
`;

const Input = styled.input`
  width: ${props => props.width};
  height: ${props => props.height};
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

export default SignInPage;
