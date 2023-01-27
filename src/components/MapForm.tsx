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
  margin-left: -40px;
  background-color: transparent;
  border: 0;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 12px;
  @media screen and (max-width: 412px) {
    position: absolute;
    margin-left: 250px;
    background-color: transparent;
    border: 0;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    margin-top: -35px;
  }
`;

export default MapForm;
