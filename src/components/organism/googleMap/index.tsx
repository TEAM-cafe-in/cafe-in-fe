import { useEffect } from 'react';

import { encodeSVG } from './encodeSVG';
import { tagSvgRaw } from './tagSvgRaw';

// 예시 카페 더미 데이터데이터
// 1 , 2, 3 (여유, 보통, 혼잡)
const GoogleMapComponent = () => {
  const locations = [
    {
      place: '건대입구역',
      lat: 37.539922,
      lng: 127.070609,
      averageCongestion: '1',
    },
    {
      place: '파스쿠찌 건대입구역점',
      lat: 37.540383,
      lng: 127.070613,
      averageCongestion: '2',
    },
    {
      place: '도우터',
      lat: 37.5407622,
      lng: 127.0706095,
      averageCongestion: '3',
    },
    {
      place: '스타벅스 건대입구역점',
      lat: 37.5406772,
      lng: 127.0694592,
      averageCongestion: '0',
    },
  ];

  // 구글 맵 콜백 함수 initMap 정의
  const initMap = () => {
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 18,
        center: { lat: 37.5407622, lng: 127.0706095 },
        // 구글 맵 기존에 존재하는 카페, 음식점, 교통 ui 없애기
        disableDefaultUI: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      }
    );
    // 카페 위치 마커 찍기
    locations.forEach((data) => {
      const markerText = data.place;
      // SVG 태그를 동적으로 생성
      const markerElement = document.createElement('div');
      markerElement.innerHTML = markerText;
      const markerTextContent = markerElement.textContent || '';
      const cafeSvg = tagSvgRaw(markerTextContent, data.averageCongestion);

      // SVG 이미지를 icon으로 구글 맵 마커 찍기
      // elint => marker 변수 사용하지 않음
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const marker = new google.maps.Marker({
        position: { lat: data.lat, lng: data.lng },
        map,
        icon: {
          url: encodeSVG(cafeSvg),
          scaledSize: new google.maps.Size(181, 65),
        },
      });
    });
  };

  useEffect(() => {
    if (typeof google !== 'undefined') {
      initMap();
    }
  }, []);

  return (
    <>
      <div id="map" style={{ width: '100%', height: '100vh' }} />

      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&callback=initMap`}
        async
      />
    </>
  );
};
export default GoogleMapComponent;
