import './MapFormStyle.scss';
import styled from 'styled-components';

interface MapFormProps {
  handleSubmit: React.FormEventHandler;
}

const MapForm = ({ handleSubmit }: MapFormProps) => {
  return (
    <div className="map-form">
      <form onSubmit={handleSubmit}>
        <i></i>
        <input type="text" name="keyword" placeholder="위치를 입력해주세요!" />
        <ClearAll type="reset" value="X"></ClearAll>
      </form>
    </div>
  );
};

const ClearAll = styled.input`
  position: absolute;
  margin-left: 93%;
  top: 2px;
  background-color: transparent;
  border: 0;
  font-size: 16px;
  font-weight: bold;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #dcdae6;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  margin-top: 12px;
  @media screen and (max-width: 1120px) {
    margin-left: 87%;
  }
  @media screen and (max-width: 412px) {
    position: absolute;
    margin-left: 87%;
    background-color: transparent;
    border: 0;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    margin-top: -35px;
  }
`;

export default MapForm;
