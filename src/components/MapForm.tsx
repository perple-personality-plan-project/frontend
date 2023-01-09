import './MapFormStyle.scss';

interface MapFormProps {
  handleSubmit: React.FormEventHandler;
}

const MapForm = ({ handleSubmit }: MapFormProps) => {
  return (
    <div className="map-form">
      <form onSubmit={handleSubmit}>
        <i></i>
        <input type="text" name="keyword" placeholder="위치를 입력해주세요!" />
      </form>
    </div>
  )
};

export default MapForm;
