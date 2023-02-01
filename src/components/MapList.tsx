import { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import './MapListStyle.scss';
import { useAppDispatch } from './hooks/typescripthook/hooks';
import { __MoveCart } from '../redux/modules/mapSlice';
import { KakaoPagination, KakaoPlace } from '../pages/MapPage';

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
      alert('장바구니에 담겼습니다.');
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
                width="20"
                height="20"
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
                <Detail
                  href={kakaoPlace.place_url}
                  target="_blank"
                  className="place-address"
                >
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 2a6 6 0 0 1 6 6v1h4v2h-1.167l-.757 9.083a1 1 0 0 1-.996.917H4.92a1 1 0 0 1-.996-.917L3.166 11H2V9h4V8a6 6 0 0 1 6-6zm6.826 9H5.173l.667 8h12.319l.667-8zM13 13v4h-2v-4h2zm-4 0v4H7v-4h2zm8 0v4h-2v-4h2zm-5-9a4 4 0 0 0-3.995 3.8L8 8v1h8V8a4 4 0 0 0-3.8-3.995L12 4z" />
                  </svg>
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
  background-color: transparent;
  border: transparent;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #333;
  cursor: pointer;
  @media screen and (max-width: 412px) {
    margin-left: 170px;
  }
`;
const Detail = styled.a`
  margin-left: 230px;
  @media screen and (max-width: 412px) {
    margin-left: 180px;
  }
`;

export default MapList;
