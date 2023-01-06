import styled from 'styled-components';

const PostCard = () => {
  return (
    <StGroups>
      <StGroup>
        <ImgWrap>
          <ImgBox>
            <img
              src={require('../빡빡이1.png')}
              style={{
                display: 'flex',
                gridColumnGap: '10px',
                marginTop: '3px',
              }}
            />
            <NickName>닉네임</NickName>
            <Tag>ENFP</Tag>
            <Spot>왕십리</Spot>
          </ImgBox>
        </ImgWrap>
        <Content>
          <h2>ENFP 만화 카페 그룹</h2>
          <p>{`만화 카페 정보 공유하는 방입니다 :)`}</p>
          <div>2023.01.04</div>
          <Mark>
            <Btn></Btn>
            <Btn></Btn>
            <Btn></Btn>
          </Mark>
        </Content>
      </StGroup>
      <StGroup>
        <ImgWrap>
          <ImgBox>
            <img
              src={require('../빡빡이1.png')}
              style={{
                display: 'flex',
                gridColumnGap: '10px',
                marginTop: '3px',
              }}
            />
            <NickName>닉네임</NickName>
            <Tag>ENFP</Tag>
            <Spot>왕십리</Spot>
          </ImgBox>
        </ImgWrap>
        <Content>
          <h2>ENFP 만화 카페 그룹</h2>
          <p>{`만화 카페 정보 공유하는 방입니다 :)`}</p>
          <div>2023.01.04</div>
          <Mark>
            <Btn></Btn>
            <Btn></Btn>
            <Btn></Btn>
          </Mark>
        </Content>
      </StGroup>
      <StGroup>
        <ImgWrap>
          <ImgBox>
            <img
              src={require('../빡빡이1.png')}
              style={{
                display: 'flex',
                gridColumnGap: '10px',
                marginTop: '3px',
              }}
            />
            <NickName>닉네임</NickName>
            <Tag>ENFP</Tag>
            <Spot>왕십리</Spot>
          </ImgBox>
        </ImgWrap>
        <Content>
          <h2>ENFP 만화 카페 그룹</h2>
          <p>{`만화 카페 정보 공유하는 방입니다 :)`}</p>
          <div>2023.01.04</div>
          <Mark>
            <Btn></Btn>
            <Btn></Btn>
            <Btn></Btn>
          </Mark>
        </Content>
      </StGroup>
      <StGroup>
        <ImgWrap>
          <ImgBox>
            <img
              src={require('../빡빡이1.png')}
              style={{
                display: 'flex',
                gridColumnGap: '10px',
                marginTop: '3px',
              }}
            />
            <NickName>닉네임</NickName>
            <Tag>ENFP</Tag>
            <Spot>왕십리</Spot>
          </ImgBox>
        </ImgWrap>
        <Content>
          <h2>ENFP 만화 카페 그룹</h2>
          <p>{`만화 카페 정보 공유하는 방입니다 :)`}</p>
          <div>2023.01.04</div>
          <Mark>
            <Btn></Btn>
            <Btn></Btn>
            <Btn></Btn>
          </Mark>
        </Content>
      </StGroup>
    </StGroups>
  );
};

const StGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 15px;
  gap: 20px;

  @media screen and (max-width: 412px) {
    flex-direction: column;
  }
`;

const StGroup = styled.div`
  box-shadow: 0px 0px 8px gray;
  border-radius: 18px;
  padding-bottom: 20px;
`;
const ImgWrap = styled.div`
  width: 500px;
  height: 430px;
  border-radius: 18px;
  background-color: rgb(245, 245, 245);
  @media screen and (max-width: 412px) {
    width: 100%;
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;

  @media screen and (max-width: 412px) {
    width: 100%;
    font-size: 10px;
    column-gap: 2%;
  }
`;
const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  @media screen and (max-width: 412px) {
    display: flex;
    font-size: 15px;
  }
`;
const Content = styled.div`
  margin-top: 5%;
  margin-left: 5%;
  align-items: center;
  align-content: space-around;
`;

const Spot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 80px;
  height: 40px;
  font-size: 20px;
  border-radius: 30px;
  background-color: #b5b2b2;
  color: white;
  margin-left: 35%;
  @media screen and (max-width: 412px) {
    font-size: 15px;
    margin-right: 3%;
    margin-left: 20%;
  }
`;
const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 80px;
  height: 40px;
  font-size: 20px;
  border-radius: 30px;
  background-color: #b5b2b2;
  color: white;
  @media screen and (max-width: 412px) {
    font-size: 15px;
    width: 20%;
    margin-left: auto;
  }
`;

const Mark = styled.div`
  display: flex;
  margin-left: 65%;
  gap: 10px;
`;
const Btn = styled.div`
  width: 40px;
  height: 40px;
  background-color: #b5b2b2;
  @media screen and (max-width: 412px) {
    margin-right: 5%;
    height: 30px;
  }
`;

export default PostCard;
