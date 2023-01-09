import { useState, useEffect, useCallback, useRef } from 'react';
import Map from '../components/Map';
import MapForm from '../components/MapForm';
import MapList from '../components/MapList';

// @webius - Window 인터페이스에 Kakao API를 위한 kakao 객체 정의
declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

// @webius - 기본 마커 이미지
const defaultMarkerImage = {
  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
  size: new kakao.maps.Size(36, 37), // 마커 이미지 크기
  options: {
    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지 크기
    spriteOrigin: null,
    offset: new kakao.maps.Point(13, 37), // 마커 이미지 내 좌표
  },
};

// @webius - Kakao Map API를 위한 타입이 별도로 없기 때문에 지정하여 관리
export type KakaoMap = any;
export type KakaoLatLng = any;
export type KakaoSearchPlace = any;
export type KakaoInfoWindow = any;
export type KakaoServiceStatus = 'OK' | 'ERROR' | 'ZERO_RESULT';

// @webius - 장소 인터페이스
export interface KakaoPlace {
  address_name: string; // 주소
  category_group_code: string;
  category_group_name: string;
  category_name: string; // 카테고리 (대분류 > 소분류)
  distance: string;
  id: string; // 고유 ID
  phone: string; // 전화번호
  place_name: string; // 이름
  place_url: string; // URL
  road_address_name: string; // 도로명 주소
  x: string; // Lng
  y: string; // Lat
  marker?: KakaoMarker;
  handleMouseOver?: () => void;
  handleMouseOut?: () => void;
}
// @webius - 페이징 인터페이스
export interface KakaoPagination {
  current: number; // 현재 페이지
  first: number; // 처음
  hasNextPage: boolean; // 다음 페이지 유무
  hasPrevPage: boolean; // 이전 페이지 유무
  last: number; // 마지막
  perPage: number; // 페이지당 노출 수
  totalCount: number; // 전체 수
  gotoFirst: () => void; // 처음 페이지 조회
  gotoLast: () => void; // 마지막 페이지 조회
  gotoPage: (page: number) => void; // 특정 페이지 조회
  nextPage: () => void; // 다음 페이지 조회
  prevPage: () => void; // 이전 페이지 조회
}
export type KakaoMarker = any; // 카카오 마커 객체

const MapPage = () => {
  // @webius - Ref Hook 참고 https://ko.reactjs.org/docs/hooks-reference.html#useref
  const map = useRef<KakaoMap>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapSearchPlace = useRef<KakaoSearchPlace>(null);
  const mapInfoWindow = useRef<KakaoInfoWindow>(null);

  // @webius - 렌더링에 필요한 데이터
  const [kakaoPlaces, setKakaoPlaces] = useState<KakaoPlace[]>([]);
  const [kakaoPagination, setKakaoPagination] =
    useState<KakaoPagination | null>(null);
  const [kakaoMarkers, setKakaoMarkers] = useState<KakaoMarker[]>([]);

  useEffect(() => {
    if (mapContainer.current === null) {
      return;
    }

    // @webius - 맵 생성
    map.current = new kakao.maps.Map(mapContainer.current, {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    });

    // @webius - 검색 객체 생성
    mapSearchPlace.current = new kakao.maps.services.Places();

    // @webius - 인포 윈도우 생성
    mapInfoWindow.current = new kakao.maps.InfoWindow({ zIndex: 1 });
  }, []);

  // @webius - 인포 윈도우 등록
  const handleVisiblePlace = useCallback(
    (kakaoMarker: KakaoMarker, title: string) => {
      // @webius - 장소를 지도 중앙으로 설정
      map.current.setCenter(kakaoMarker.getPosition());

      const content = `<div style="padding: 5px; z-index: 1;">${title}</div>`;

      mapInfoWindow.current.setContent(content);
      mapInfoWindow.current.open(map.current, kakaoMarker);
    },
    [mapInfoWindow],
  );

  // @webius - 인포 윈도우 비우기
  const handleHiddenPlace = useCallback(() => {
    mapInfoWindow.current.close();
  }, [mapInfoWindow]);

  // @webius - 키워드 검색 콜백 함수
  const searchPlaceCallback = useCallback(
    (
      places: KakaoPlace[],
      status: KakaoServiceStatus,
      pagination: KakaoPagination,
    ) => {
      if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
        return;
      }

      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      }

      if (status === kakao.maps.services.Status.OK) {
        // @webius - 검색 결과 표시
        places = places.map((kakaoPlace, index): KakaoPlace => {
          // @webius - LatLng 포지션 생성
          const position = new kakao.maps.LatLng(kakaoPlace.y, kakaoPlace.x);

          // @webius - 기존 마커 이미지에서 필요한 부분만 Overwrite 하여 사용
          const markerImageOptions = Object.assign(
            {},
            defaultMarkerImage.options,
            {
              spriteOrigin: new kakao.maps.Point(0, index * 46 + 10),
            },
          );
          const image = new kakao.maps.MarkerImage(
            defaultMarkerImage.src,
            defaultMarkerImage.size,
            markerImageOptions,
          );

          // @webius - 마커 오브젝트 생성
          const marker = new kakao.maps.Marker({
            position,
            image,
          });

          const handleMouseOver = () =>
            handleVisiblePlace(marker, kakaoPlace.place_name);
          const handleMouseOut = () => handleHiddenPlace();

          // @webius - 마커 인포 표시/비표시 이벤트 등록
          kakao.maps.event.addListener(marker, 'mouseover', handleMouseOver);
          kakao.maps.event.addListener(marker, 'mouseout', handleMouseOut);

          return {
            ...kakaoPlace,
            marker,
            handleMouseOver,
            handleMouseOut,
          };
        });
        setKakaoPlaces(places);

        // @webius - 페이지 번호 표시
        setKakaoPagination(pagination);

        // @wbeius - 마킹 데이터 적용
        const markers = places.map(kakaoPlace => kakaoPlace.marker);
        setKakaoMarkers(markers);
      }
    },
    [handleVisiblePlace, handleHiddenPlace],
  );

  // @webius - 키워드 검색
  const searchPlace = useCallback(
    (keyword: string) => {
      // @webius - 키워드가 공백인 경우
      if (!keyword.replace(/\s/g, '')) {
        alert('키워드를 입력해주세요!');
        return;
      }

      // @webius - 카카오 키워드 검색
      mapSearchPlace.current.keywordSearch(keyword, searchPlaceCallback);
    },
    [searchPlaceCallback],
  );

  // @webius - 키워드 검색 Submit 핸들러
  const handleSearchPlaceSubmit = useCallback(
    (event: React.FormEvent) => {
      // @webius - 화면 전환 방지
      event.preventDefault();

      // @webius - EventTarget -> HTMLFormElement 타입으로 변환 (JSX 형식으로 인해 <> 형변환 대신 as 사용)
      const form = event.target as HTMLFormElement;

      // @webius - HTMLFormElement 타입으로 지정
      const keyword: HTMLInputElement = form.keyword;

      // @webius - 검색 핸들러 실행
      searchPlace(keyword.value);
    },
    [searchPlace],
  );

  // @webius - 마커 작성
  useEffect(() => {
    if (kakaoMarkers.length) {
      const bounds = new kakao.maps.LatLngBounds();

      kakaoMarkers.forEach(kakaoMarker => {
        // @webius - 지도에 마커 표시
        kakaoMarker.setMap(map.current);

        // @webius - 지도에 추적할 장소 등록
        bounds.extend(kakaoMarker.getPosition());
      });

      // @webius - 검색된 장소 위치로 지도 범위 재설정
      map.current.setBounds(bounds);

      return () => {
        kakaoMarkers.forEach(kakaoMarker => {
          // @webius - 마커 표시 제거
          kakaoMarker.setMap(null);
        });
      };
    }
  }, [kakaoMarkers]);

  return (
    <div className="map-page">
      <Map forwardRef={mapContainer} />
      <div
        className="map-control"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <MapForm handleSubmit={handleSearchPlaceSubmit} />
        <MapList places={kakaoPlaces} pagination={kakaoPagination} />
      </div>
    </div>
  );
};

export default MapPage;
