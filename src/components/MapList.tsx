import { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { KakaoPagination, KakaoPlace } from '../pages/MapPage';
import './MapListStyle.scss';
import styled from 'styled-components';
import { useAppDispatch } from './hooks/typescripthook/hooks';
import { __MoveCart } from '../redux/modules/mapSlice';

interface MapListProps {
  places: KakaoPlace[];
  pagination: KakaoPagination | null;
}

const MapList = ({ places, pagination }: MapListProps) => {
  const mapList = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const [place, setPlace] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const handleMoveCart = useCallback(
    (kakaoPlace: any, kakaoAddress: any, kakaoX: any, kakaoY: any) => {
      setPlace(kakaoPlace);
      setAddress(kakaoAddress);
      setX(kakaoX);
      setY(kakaoY);
    },
    [],
  );
  useEffect(() => {
    if (place !== '') {
      dispatch(__MoveCart(Cart));
    }
  }, [place]);

  const Cart = {
    place_name: place,
    address_name: address,
    x: x,
    y: y,
  };

  // - 페이징 가공 작업
  const paginations = useMemo(() => {
    const array = [];

    if (pagination !== null) {
      for (let index = 1; index <= pagination.last; index++) {
        array.push(index);
      }
    }

    return array;
  }, [pagination]);

  // - 페이징 클릭 핸들러
  const handleClickPagination = useCallback(
    (page: number) => {
      if (pagination !== null) {
        // - 특정 페이지 표시
        pagination.gotoPage(page);

        // - 목록 스크롤 영역 최상단으로 이동
        mapList.current?.scrollTo({ top: 0 });
      }
    },
    [pagination],
  );
  //onclick send data to cart

  return (
    <div className="map-list" ref={mapList}>
      <div className="map-places">
        {places.map((kakaoPlace, index) => {
          return (
            <div
              className="map-place"
              key={kakaoPlace.id}
              onMouseOver={kakaoPlace.handleMouseOver}
              onMouseOut={kakaoPlace.handleMouseOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                color="#644EEE"
                fill="currentColor"
                className="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              <div>
                <span className="place-mark">
                  {index + 1}
                  {/* {String.fromCharCode(65 + index)} */}
                </span>
                <strong className="place-name">{kakaoPlace.place_name}</strong>
                <span className="place-address">{kakaoPlace.address_name}</span>
                <Detail href={kakaoPlace.place_url} className="place-address">
                  자세히보기
                </Detail>
                <Cartbtn
                  onClick={e => {
                    handleMoveCart(
                      kakaoPlace.place_name,
                      kakaoPlace.address_name,
                      kakaoPlace.x,
                      kakaoPlace.y,
                    );
                  }}
                >
                  장바구니
                </Cartbtn>
              </div>
            </div>
          );
        })}
      </div>
      <div className="map-pagination">
        {paginations.map(page => {
          return (
            <button
              className={pagination!.current === page ? 'on' : ''}
              key={page}
              onClick={() => handleClickPagination(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};
const Cartbtn = styled.button`
  // small button style top right inside of the box
  position: absolute;
  width: 70px;
  height: 30px;
  margin-left: 230px;
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #333;
  cursor: pointer;
`;
const Detail = styled.a`
  margin-left: 230px;
`;

export default MapList;
