import { useMemo, useCallback, useRef } from 'react';
import { KakaoPagination, KakaoPlace } from '../pages/MapPage';
import './MapListStyle.scss';

interface MapListProps {
  places: KakaoPlace[];
  pagination: KakaoPagination | null;
}

const MapList = ({ places, pagination }: MapListProps) => {
  const mapList = useRef<HTMLDivElement>(null);

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

  return (
    <div className="map-list" ref={mapList}>
      <div className="map-places">
        {places.map((kakaoPlace, index) => {
          return (
            <button
              className="map-place"
              key={kakaoPlace.id}
              onMouseOver={kakaoPlace.handleMouseOver}
              onMouseOut={kakaoPlace.handleMouseOut}
            >
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <span className="place-mark">
                  {String.fromCharCode(65 + index)}
                </span>
                <strong className="place-name">{kakaoPlace.place_name}</strong>
                <span className="place-address">{kakaoPlace.address_name}</span>
              </div>
            </button>
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

export default MapList;
