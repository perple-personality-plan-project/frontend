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
              <p>Platter 간편 검사</p>
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StSelect>한 개의 검사를 클릭해주세요!</StSelect>
          {/* <Button>검사하러 갈래요!</Button> */}
        </div>
      </FormWrap>
    </Wrap>
  );
};
export default MbtiCheckPage;

const Wrap = styled.div`
  * {
    box-sizing: border-box;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 10%; */
`;

const Title = styled.span`
  font-size: 30px;
  /* font-weight: 600; */

  .title {
    font-weight: 100;
    margin-top: 75px;
    color: #5b5b5b;
  }
`;

const FormWrap = styled.form`
  width: fit-content;
  height: fit-content;
  border-radius: 18px;
  margin-top: 75px;
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
  font-family: 'Nanum_L';
  margin-top: 149px;
  width: 555.55px;
  height: 56px;
  background-color: #644eee;
  border-radius: 40px;
  border: 0;
  font-size: 20.31px;
  color: white;

  cursor: pointer;
`;

const StSelect = styled.p`
  text-align: center;
  margin-top: 149px;
  font-size: 20.31px;
  color: #5b5b5b;

  @media screen and (max-width: 800px) {
    margin: 60px 0 40px;
  }
`;

const StGroupPosts = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  gap: 43px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }

  .post-container {
    position: relative;
    width: 376px;
    height: 417px;
    cursor: pointer;

    background-color: white;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
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
