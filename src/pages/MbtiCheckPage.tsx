import styled from 'styled-components';
import { useNavigate } from 'react-router';

const MbtiCheckPage = () => {
  const navigate = useNavigate();
  const url = 'https://www.16personalities.com/ko/';

  return (
    <Wrap>
      <Title>
        <div className="title">두가지 검사가 있어요!</div>
      </Title>
      <FormWrap>
        <StGroupPosts>
          <div
            className="post-container"
            onClick={() => navigate('/mbtiquestion')}
          >
            <img src={require('../빡빡이1.png')} alt="group-img" />
            <div className="post-desc">
              <p>perple 간편 검사</p>
            </div>
          </div>
          <div
            className="post-container"
            onClick={() => {
              window.open(url);
            }}
          >
            <img src={require('../빡빡이1.png')} alt="group-img" />
            <div className="post-desc">
              <p>16성격 유형 검사</p>
            </div>
          </div>
        </StGroupPosts>
        <ButtonWrap>
          <Button style={{ width: '398px', height: '40px', marginTop: '7%' }}>
            검사하러 갈래요!
          </Button>
        </ButtonWrap>
      </FormWrap>
    </Wrap>
  );
};
export default MbtiCheckPage;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
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
  margin: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const ButtonWrap = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  width: '18vw';
  height: '10vh';
  margin: auto;
  @media screen and (max-width: 412px) {
    .gathered {
      display: flex;
      flex-direction: row;
      width: 100%;
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

const StGroupPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;


  .post-container {
    position: relative;
    width: 330px;

    background-color: white;
    border: 5px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;

    @media screen and (max-width: 412px) {
    margin: auto;
    }
  }

    img {
      width: 80%;
      background-color: #f0f0f0;
      margin: 10% 10% 0 10%;
    }

    .post-desc {
      /* margin: 15px; */
      padding-left: 25%;
      p {
        margin: 20px;
        overflow: auto;
        font-size: 2ch;
      }
    }
  
`;
