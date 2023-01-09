import { KakaoMap } from '../pages/MapPage';
import './MapStyle.scss';

interface MapProps {
  forwardRef: React.MutableRefObject<KakaoMap>;
}

const Map = ({ forwardRef }: MapProps) => {
  return <div id="map" ref={forwardRef}></div>;
};

export default Map;
