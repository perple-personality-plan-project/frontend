import React, { useState } from 'react';
import styled from 'styled-components';

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

  console.log(mbti, result);
  return (
    <div>
      <StTitleContainer>간편검사</StTitleContainer>
      <StHorizontalLine />
      <StQuestions>
        <StQuestion>
          <p>나는 여행 계획을 짜지 않고 여행을 가는 편이다.</p>
          <div>
            <input name="firstMBTI" value="I" type="radio" onChange={getMbti} />
            <label>그렇다</label>
            <input name="fisrtMBTI" value="E" type="radio" onChange={getMbti} />
            <label>그렇지 않다</label>
          </div>
        </StQuestion>
        <StQuestion>
          <p>나는 여행 계획을 짜지 않고 여행을 가는 편이다.</p>
          <div>
            <input
              name="secondMBTI"
              value="N"
              type="radio"
              onChange={getMbti}
            />
            <label>그렇다</label>
            <input
              name="secondMBTI"
              value="S"
              type="radio"
              onChange={getMbti}
            />
            <label>그렇지 않다</label>
          </div>
        </StQuestion>
        <StQuestion>
          <p>나는 여행 계획을 짜지 않고 여행을 가는 편이다.</p>
          <div>
            <input name="thirdMBTI" value="T" type="radio" onChange={getMbti} />
            <label>그렇다</label>
            <input name="thirdMBTI" value="F" type="radio" onChange={getMbti} />
            <label>그렇지 않다</label>
          </div>
        </StQuestion>
        <StQuestion>
          <p>나는 여행 계획을 짜지 않고 여행을 가는 편이다.</p>
          <div>
            <input
              name="fourthMBTI"
              value="P"
              type="radio"
              onChange={getMbti}
            />
            <label>그렇다</label>
            <input
              name="fourthMBTI"
              value="J"
              type="radio"
              onChange={getMbti}
            />
            <label>그렇지 않다</label>
          </div>
        </StQuestion>
        <StBtn onClick={getResult}>결과보기</StBtn>
        {result && <p>{result}</p>}
      </StQuestions>
    </div>
  );
};

export default MbtiQuestionsPage;

const StTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const StHorizontalLine = styled.div`
  border-bottom: 1px solid #f2f2f2;
`;

const StQuestions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 40px;
`;

const StQuestion = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 40px;
  }

  label {
    &:first-of-type {
      margin-right: 40px;
    }
  }
`;

const StBtn = styled.button`
  margin-top: 30px;
  padding: 10px;
  width: 150px;

  border-radius: 20px;
  border: 0;

  background-color: #5b5b5b;
  color: white;

  cursor: pointer;
`;
