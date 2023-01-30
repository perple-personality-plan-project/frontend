import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';

import {
  __RemoveItem,
  __RootMaker,
  __RemoveAllItem,
} from '../redux/modules/mapSlice';
import client from '../api/client';
import Map from '../components/Map';
import MapForm from '../components/MapForm';
import MapList from '../components/MapList';
import styled from 'styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/hooks/typescripthook/hooks';

// Window 인터페이스에 Kakao API를 위한 kakao 객체 정의
declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

// 기본 마커 이미지
const defaultMarkerImage = {
  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
  size: new kakao.maps.Size(36, 37), // 마커 이미지 크기
  options: {
    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지 크기
    spriteOrigin: null,
    offset: new kakao.maps.Point(13, 37), // 마커 이미지 내 좌표
  },
};

// - Kakao Map API를 위한 타입이 별도로 없기 때문에 지정하여 관리
export type KakaoMap = any;
export type KakaoLatLng = any;
export type KakaoSearchPlace = any;
export type KakaoInfoWindow = any;
export type KakaoServiceStatus = 'OK' | 'ERROR' | 'ZERO_RESULT';

// - 장소 인터페이스
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
// - 페이징 인터페이스
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

type RootType = {
  place_group: string;
  place_group_name: string;
};

interface IAppState {
  show: boolean;
}

const MapPage = () => {
  const navigate = useNavigate();
  //- Ref Hook 참고 https://ko.reactjs.org/docs/hooks-reference.html#useref
  const map = useRef<KakaoMap>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapSearchPlace = useRef<KakaoSearchPlace>(null);
  const mapInfoWindow = useRef<KakaoInfoWindow>(null);

  // - 렌더링에 필요한 데이터
  const [kakaoPlaces, setKakaoPlaces] = useState<KakaoPlace[]>([]);
  const [kakaoPagination, setKakaoPagination] =
    useState<KakaoPagination | null>(null);
  const [kakaoMarkers, setKakaoMarkers] = useState<KakaoMarker[]>([]);
  const [checkedInputs, setCheckedInputs] = useState<any>([]);
  const [Root, setRoot] = useState<any>([]);
  const [RootTitle, setRootTitle] = useState<any>([]);
  const [checked, setChecked] = useState(false);
  const [Modals, setModals] = useState(true);

  const useselector = useAppSelector(state => state.map.MapPost);
  const dispatch = useAppDispatch();

  const maplist = useselector;

  const stringRoot = JSON.stringify(maplist);

  //onchange Root Title
  const onChangeRoot = (e: any) => {
    setRoot([...Root, e]);
  };
  const onChangeRootTitle = (e: any) => {
    setRootTitle(e);
  };
  const accessToken = sessionStorage.getItem('accessToken');
  //dispatch __RootMaker
  const dispatchRoot = async (event: any) => {
    if (accessToken === null) {
      event.preventDefault();
      // eslint-disable-next-line no-restricted-globals
      if (confirm('로그인이 필요합니다.로그인을 하시겠습니까?')) {
        navigate('/signin');
      } else {
        return;
      }
    } else {
      event.preventDefault();
      const Roots: RootType = {
        place_group: stringRoot,
        place_group_name: RootTitle,
      };
      if (Roots.place_group === '[]') {
        alert('장바구니에 루트를 담아주세요');
      } else {
        await dispatch(__RootMaker(Roots));
        await alert('루트가 생성되었습니다.');
        await dispatch(__RemoveAllItem([]));
      }
    }
  };

  const changeHandler = (checked: any, id: any) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el: any) => el !== id));
    }
  };

  function togglechange() {
    setCheckedInputs([...checkedInputs, 0, 1, 2, 3, 4]);
    setChecked(!checked);
  }
  function toggleUncheck() {
    setCheckedInputs([]);
    setChecked(!checked);
  }

  const ModalShow = () => {
    setModals(!Modals);
  };

  const dispatchPlaceName = (placeName: string) => {
    dispatch(__RemoveItem(placeName));
  };

  useEffect(() => {
    if (mapContainer.current === null) {
      return;
    }

    // - 맵 생성
    map.current = new kakao.maps.Map(mapContainer.current, {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    });

    //- 검색 객체 생성
    mapSearchPlace.current = new kakao.maps.services.Places();

    // - 인포 윈도우 생성
    mapInfoWindow.current = new kakao.maps.InfoWindow({ zIndex: 1 });
  }, []);

  // - 인포 윈도우 등록
  const handleVisiblePlace = useCallback(
    (kakaoMarker: KakaoMarker, title: string) => {
      // - 장소를 지도 중앙으로 설정
      map.current.setCenter(kakaoMarker.getPosition());

      const content = `<div style="padding: 5px; z-index: 1;">${title}</div>`;

      mapInfoWindow.current.setContent(content);
      mapInfoWindow.current.open(map.current, kakaoMarker);
    },
    [mapInfoWindow],
  );

  // - 인포 윈도우 비우기
  const handleHiddenPlace = useCallback(() => {
    mapInfoWindow.current.close();
  }, [mapInfoWindow]);

  // - 키워드 검색 콜백 함수
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
        //  - 검색 결과 표시
        places = places.map((kakaoPlace, index): KakaoPlace => {
          //  - LatLng 포지션 생성
          const position = new kakao.maps.LatLng(kakaoPlace.y, kakaoPlace.x);

          // - 기존 마커 이미지에서 필요한 부분만 Overwrite 하여 사용
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

          // - 마커 오브젝트 생성
          const marker = new kakao.maps.Marker({
            position,
            image,
          });

          const handleMouseOver = () =>
            handleVisiblePlace(marker, kakaoPlace.place_name);
          const handleMouseOut = () => handleHiddenPlace();

          // - 마커 인포 표시/비표시 이벤트 등록
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

        // - 페이지 번호 표시
        setKakaoPagination(pagination);

        // - 마킹 데이터 적용
        const markers = places.map(kakaoPlace => kakaoPlace.marker);
        setKakaoMarkers(markers);
      }
    },
    [handleVisiblePlace, handleHiddenPlace],
  );

  // - 키워드 검색
  const searchPlace = useCallback(
    (keyword: string) => {
      // - 키워드가 공백인 경우
      if (!keyword.replace(/\s/g, '')) {
        alert('키워드를 입력해주세요!');
        return;
      }

      // - 카카오 키워드 검색
      mapSearchPlace.current.keywordSearch(keyword, searchPlaceCallback);
    },
    [searchPlaceCallback],
  );

  // - 키워드 검색 Submit 핸들러
  const handleSearchPlaceSubmit = useCallback(
    (event: React.FormEvent) => {
      // - 화면 전환 방지
      event.preventDefault();

      // - EventTarget -> HTMLFormElement 타입으로 변환 (JSX 형식으로 인해 <> 형변환 대신 as 사용)
      const form = event.target as HTMLFormElement;

      // - HTMLFormElement 타입으로 지정
      const keyword: HTMLInputElement = form.keyword;

      // - 검색 핸들러 실행
      searchPlace(keyword.value);
    },
    [searchPlace],
  );

  // - 마커 작성
  useEffect(() => {
    if (kakaoMarkers.length) {
      const bounds = new kakao.maps.LatLngBounds();

      kakaoMarkers.forEach(kakaoMarker => {
        // - 지도에 마커 표시
        kakaoMarker.setMap(map.current);

        // - 지도에 추적할 장소 등록
        bounds.extend(kakaoMarker.getPosition());
      });

      // - 검색된 장소 위치로 지도 범위 재설정
      map.current.setBounds(bounds);

      return () => {
        kakaoMarkers.forEach(kakaoMarker => {
          // - 마커 표시 제거
          kakaoMarker.setMap(null);
        });
      };
    }
  }, [kakaoMarkers]);
  const [trigger, setTrigger] = useState(false);

  const logout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      await client.post('api/user/logout');
      sessionStorage.clear();
      setTrigger(!trigger);
    }
  };

  return (
    <div className="map-page">
      <Cart onClick={ModalShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 2a6 6 0 0 1 6 6v1h4v2h-1.167l-.757 9.083a1 1 0 0 1-.996.917H4.92a1 1 0 0 1-.996-.917L3.166 11H2V9h4V8a6 6 0 0 1 6-6zm6.826 9H5.173l.667 8h12.319l.667-8zM13 13v4h-2v-4h2zm-4 0v4H7v-4h2zm8 0v4h-2v-4h2zm-5-9a4 4 0 0 0-3.995 3.8L8 8v1h8V8a4 4 0 0 0-3.8-3.995L12 4z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
        <CartNum>{maplist.length}</CartNum>
      </Cart>
      <Modal show={Modals}>
        <SelectAll show={checked}>
          <input onClick={togglechange} type="checkbox" checked={false}></input>
          <SelectText>전체 선택</SelectText>
        </SelectAll>
        <UnselectAll show={checked}>
          <input onClick={toggleUncheck} type="checkbox" checked></input>
          <SelectText>선택 해제</SelectText>
        </UnselectAll>
        <BoxContainer>
          <Box>
            <form onSubmit={dispatchRoot}>
              {maplist.map((item: any, index: number) => {
                return (
                  <CheckBoxForm key={index}>
                    <CheckBox
                      required
                      type="checkbox"
                      name="checkbox"
                      value={index + 1}
                      onChange={e => {
                        changeHandler(e.currentTarget.checked, index);
                        onChangeRoot({
                          place_name: item.place_name,
                          address_name: item.address_name,
                          x: item.x,
                          y: item.y,
                        });
                      }}
                      checked={checkedInputs.includes(index) ? true : false}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      color="#B2A7F7"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <Desc>
                      <ID>{index + 1}</ID>
                      <Delete
                        onClick={e => {
                          dispatchPlaceName(item.place_name);
                        }}
                      >
                        X
                      </Delete>
                      <CheckLabel>{item.place_name}</CheckLabel>
                      <CheckDesc>{item.address_name}</CheckDesc>
                    </Desc>
                  </CheckBoxForm>
                );
              })}
              <RootName
                placeholder="이름을 입력해 주세요"
                onChange={e => onChangeRootTitle(e.target.value)}
                required
              ></RootName>
              <RootBtn>루트 만들기</RootBtn>
            </form>
          </Box>
          <BorderBox>
            <Indicator>루트이름</Indicator>
          </BorderBox>
        </BoxContainer>
      </Modal>
      <Map forwardRef={mapContainer} />
      <div
        className="map-control"
        style={{
          position: 'absolute',
          left: 0,
          top: -0,
          width: '100%',
          height: '90%',
          marginTop: '70px',
        }}
      >
        <MapForm handleSubmit={handleSearchPlaceSubmit} />
        <MapList places={kakaoPlaces} pagination={kakaoPagination} />
      </div>
    </div>
  );
};

const Cart = styled.div`
  //position right
  position: absolute;
  top: 5%;
  right: 120px;
  transform: translate(0, -50%);
  font-weight: bold;
  cursor: pointer;
  z-index: 100;
`;
const CartNum = styled.div`
  position: absolute;
  top: -5px;
  left: 15px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #b2a7f7;
  color: white;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div<any>`
  position: absolute;
  top: 90px;
  right: 0;
  width: 500px;
  height: 91vh;
  background-color: white;
  z-index: 100;
  display: ${props => (props.show ? 'none' : '')};
  @media (max-width: 412px) {
    width: 412px;
  }
  @media (max-width: 390px) {
    width: 390px;
  }
`;

const SelectAll = styled.div<IAppState>`
  //position top left
  position: absolute;
  top: 35px;
  left: 50px;
  font-weight: bold;
  display: ${props => (props.show ? 'none' : '')};
`;
const SelectText = styled.div`
  position: absolute;
  width: 200px;
  left: 25px;
  top: 0px;
`;

const UnselectAll = styled.div<IAppState>`
  position: absolute;
  top: 35px;
  left: 50px;
  font-weight: bold;
  display: ${props => (props.show ? '' : 'none')};
  &:checked {
    background-color: #644eee;
    //css checked content
    &:after {
      content: '✔';
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      margin: auto;
      color: white;
    }
  }
`;

const BoxContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 450px;
  height: 750px;
  @media (max-width: 412px) {
    left: 45%;
  }
`;

const Box = styled.div`
  height: 500px;
  align-items: center;
  margin: 20px 0;
  padding: 0 20px;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 100;
  //box gradation at bottom
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 90%,
    #c7b9b9 120%
  );
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 412px) {
    width: 410px;
  }
`;

const Desc = styled.div`
  display: inline-block;
  flex-direction: column;
  margin-left: 20px;
`;
const Delete = styled.div`
  margin-left: 220px;
  font-size: 20px;
  display: inline;
  cursor: pointer;
`;

const CheckBoxForm = styled.div`
  //box with border
  width: 400px;
  height: 130px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  //box shadow black
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  @media (max-width: 412px) {
    margin-left: 26px;
  }
  @media (max-width: 390px) {
    width: 380px;
    margin-left: 10px;
  }
`;
const BorderBox = styled.div`
  width: 450px;
  z-index: 100;
  height: 100px;
  border-bottom: 1px solid #e2e2e2;
  @media (max-width: 412px) {
    margin-left: 40px;
  }
`;

const Indicator = styled.div`
  z-index: 100;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 15px;
  color: #828282;
`;
const ID = styled.div`
  font-size: 20px;
  display: inline;
`;

//Radio button style
const CheckBox = styled.input`
  margin-right: 10px;
  //check box style
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  margin-left: 20px;
  cursor: pointer;
  &:checked {
    background-color: #644eee;
    //css checked content
    &:after {
      content: '✔';
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      margin: auto;
      color: white;
    }
  }
`;

//Radio button label style
const CheckLabel = styled.div`
  //css font size fit box
  font-size: 20px;
  height: 20px;
  font-weight: bold;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 10px;
`;

const CheckDesc = styled.div`
  font-size: 14px;
  margin-top: 10px;
  font-family: 'Nanum_R';
`;
const RootName = styled.input`
  //position bottom
  position: absolute;
  bottom: 130px;
  left: 47%;
  transform: translate(-50%, 0);
  width: 350px;
  height: 45px;
  background-color: #f1f1f1;
  border: 1px #f1f1f1;
  border-radius: 15px;
  font-size: 15px;
  padding: 0 20px;
  @media (max-width: 412px) {
    margin-left: 30px;
  }
`;

//Root button style
const RootBtn = styled.button`
  position: absolute;
  bottom: 30px;
  left: 48%;
  transform: translate(-50%, 0);
  width: 400px;
  height: 45px;
  background-color: #644eee;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  @media (max-width: 412px) {
    margin-left: 30px;
  }
`;

export default MapPage;
