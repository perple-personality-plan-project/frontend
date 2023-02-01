import React, { useEffect } from 'react';
import { useAppSelector } from '../components/hooks/typescripthook/hooks';

import Navbar from '../components/Navbar';

declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

const TogoUserlist = () => {
  const letsgo = useAppSelector(state => state.mypage.toGoList);

  const goList = letsgo.map((item: any, index) => ({
    content: `<div style="height:55px;"><div>${item.place_name}</div><div>${item.address_name}</div></div>`,
    latlng: [item.y, item.x],
  }));

  useEffect(() => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(goList[0].latlng[0], goList[0].latlng[1]), // 지도의 중심좌표
        level: 12, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다

    const newGoList = [];
    for (let i = 0; i < goList.length; i++) {
      newGoList.push({
        content: `${goList[i].content}`,
        latlng: new kakao.maps.LatLng(goList[i].latlng[0], goList[i].latlng[1]),
      });
    }

    for (var i = 0; i < newGoList.length; i++) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: newGoList[i].latlng, // 마커의 위치
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: newGoList[i].content, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow),
      );
      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(infowindow),
      );
    }

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(map: any, marker: any, infowindow: any) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow: any) {
      return function () {
        infowindow.close();
      };
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div id="map" style={{ width: '100vw', height: '92.5vh' }}></div>
    </div>
  );
};

export default TogoUserlist;
