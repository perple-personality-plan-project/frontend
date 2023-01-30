import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import mbtiData from '../assets/mbti/data.json';

const MbtiQuestionsPage = () => {
  const [mbti, setMbti] = useState({
    firstMBTI: '',
    secondMBTI: '',
    thirdMBTI: '',
    fourthMBTI: '',
  });

  const [result, setResult] = useState('');

  const getMbti = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMbti({ ...mbti, [name]: value });
  };

  const getResult = () => {
    if (
      !mbti.firstMBTI ||
      !mbti.secondMBTI ||
      !mbti.thirdMBTI ||
      !mbti.fourthMBTI
    ) {
      alert('모든 항목을 선택해주세요');
    } else {
      setResult(
        `${mbti.firstMBTI}${mbti.secondMBTI}${mbti.thirdMBTI}${mbti.fourthMBTI}`,
      );
    }
  };

  // console.log(mbtiData.E);
  // const randomTags = data.data.sort(() => Math.random() - 0.5).splice(0, 18);

  const showMbtiQuestions = () => {
    const Equestion = mbtiData.E.sort(() => Math.random() - 0.5)[0];
    const Squestion = mbtiData.S.sort(() => Math.random() - 0.5)[0];
    const Fquestion = mbtiData.F.sort(() => Math.random() - 0.5)[0];
    const Jquestion = mbtiData.J.sort(() => Math.random() - 0.5)[0];

    return { Equestion, Squestion, Fquestion, Jquestion };
  };

  const mbtiQuestions = useMemo(() => showMbtiQuestions(), []);

  return (
    <div>
      <StTitleContainer>간편검사</StTitleContainer>
      <StHorizontalLine />
      <StQuestions>
        <StQuestion>
          <p>{mbtiQuestions.Equestion}</p>
          <StInputContainer>
            <StInput>
              <input
                name="firstMBTI"
                value="E"
                type="radio"
                onChange={getMbti}
              />
              <label className="yes-label">그렇다</label>
            </StInput>
            <StInput>
              <input
                name="firstMBTI"
                value="I"
                type="radio"
                onChange={getMbti}
              />
              <label className="no-label">그렇지 않다</label>
            </StInput>
          </StInputContainer>
        </StQuestion>
        <StQuestion>
          <p>{mbtiQuestions.Squestion}</p>
          <StInputContainer>
            <StInput>
              <input
                name="secondMBTI"
                value="S"
                type="radio"
                onChange={getMbti}
              />
              <label className="yes-label">그렇다</label>
            </StInput>
            <StInput>
              <input
                name="secondMBTI"
                value="N"
                type="radio"
                onChange={getMbti}
              />
              <label className="no-label">그렇지 않다</label>
            </StInput>
          </StInputContainer>
        </StQuestion>
        <StQuestion>
          <p>{mbtiQuestions.Fquestion}</p>
          <StInputContainer className="answer-container">
            <StInput>
              <input
                name="thirdMBTI"
                value="F"
                type="radio"
                onChange={getMbti}
              />
              <label className="yes-label">그렇다</label>
            </StInput>
            <StInput>
              <input
                name="thirdMBTI"
                value="T"
                type="radio"
                onChange={getMbti}
              />
              <label className="no-label">그렇지 않다</label>
            </StInput>
          </StInputContainer>
        </StQuestion>
        <StQuestion>
          <p>{mbtiQuestions.Jquestion}</p>
          <StInputContainer className="answer-container">
            <StInput>
              <input
                name="fourthMBTI"
                value="J"
                type="radio"
                onChange={getMbti}
              />
              <label className="yes-label">그렇다</label>
            </StInput>
            <StInput>
              <input
                name="fourthMBTI"
                value="P"
                type="radio"
                onChange={getMbti}
              />
              <label className="no-label">그렇지 않다</label>
            </StInput>
          </StInputContainer>
        </StQuestion>
        {result && <StMbtiResult>{result}</StMbtiResult>}
        <StBtn onClick={getResult}>결과 보기</StBtn>
      </StQuestions>
    </div>
  );
};

export default MbtiQuestionsPage;

const StTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 67px 0;
  font-size: 30px;

  @media screen and (max-width: 500px) {
    padding: 35px;
  }
`;

const StHorizontalLine = styled.div`
  border-bottom: 1px solid #f2f2f2;
`;

const StQuestions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  margin-top: 102px;

  @media screen and (max-width: 860px) {
    width: 90%;
    margin: 70px auto 0;
  }

  @media screen and (max-width: 500px) {
    width: 90%;
    margin: 50px auto 0;
  }
`;

const StQuestion = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 52px;
  line-height: 35px;
  height: 60px;
  font-size: 25px;

  p {
    font-family: 'Nanum_R';
    /* margin-right: 40px; */
    width: 551px;
    margin-right: 98px;
    /* text-align: ; */
    /* line-height: 10px; */

    @media screen and (max-width: 1100px) {
      font-size: 20px;
      line-height: 30px;
      margin: 0 10px;
    }

    @media screen and (max-width: 860px) {
      width: 100%;
      text-align: center;
    }
  }

  @media screen and (max-width: 860px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    height: 100%;
  }
`;

const StInputContainer = styled.div`
  /* font-family: 'Nanum_R'; */
  display: flex;
  height: 60px;
`;

const StInput = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 37px;
    height: 37px;
    color: white;
    margin-right: 40px;

    @media screen and (max-width: 1100px) {
      width: 25px;
      height: 25px;
      margin-right: 20px;
    }
  }

  label {
    font-family: 'Nanum_R';
    font-size: 20px;

    @media screen and (max-width: 1100px) {
      font-size: 15px;
    }
  }

  .yes-label {
    margin-right: 95px;
    width: 52px;

    @media screen and (max-width: 1100px) {
      margin-right: 50px;
    }
  }

  .no-label {
    width: 92px;
  }

  @media screen and (max-width: 860px) {
    margin-top: 20px;
    /* margin-bottom: 200px; */
  }
`;

const StLabel = styled.div``;

const StMbtiResult = styled.p`
  font-size: 25px;
  margin: 0;
`;

const StBtn = styled.button`
  font-family: 'Nanum_R';
  margin-top: 30px;
  padding: 10px;
  width: 269px;
  height: 50px;
  font-size: 25px;

  border-radius: 40px;
  border: 0;

  background-color: #644eee;
  color: white;

  cursor: pointer;

  @media screen and (max-width: 1100px) {
    width: 230px;
    height: 40px;
    font-size: 18px;
  }

  @media screen and (max-width: 500px) {
    margin-top: 10px;
  }
`;
