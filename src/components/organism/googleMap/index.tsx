import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useDispatch } from 'react-redux';

import LocationButtonGroup from '~/components/molecule/buttons/LocationButtonGroup';
import { setCafeId } from '~/store/reducers/cafeIdSlice';
import { encodeSVG } from './encodeSVG';
import { tagSvgRaw } from './tagSvgRaw';

const GoogleMapComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Google 맵 초기화 함수 정의
    function initMap() {
      const map = new window.google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: 18,
          center: { lat: 37.557361, lng: 126.924633 },
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

      map.setOptions({
        zoomControl: true,
      });

      // 예시 카페 더미 데이터데이터
      // 1 , 2, 3 (여유, 보통, 혼잡)
      const locations = [
        {
          cafeId: '1',
          place: '카페 홍대입구역',
          lat: 37.557361,
          lng: 126.924633,
          averageCongestion: '1',
        },
        {
          cafeId: '2',
          place: '파스쿠찌 홍대입구역점',
          lat: 37.556289,
          lng: 126.924329,
          averageCongestion: '2',
        },
        {
          cafeId: '3',
          place: '도우터 홍대입구역점',
          lat: 37.557136,
          lng: 126.92386,
          averageCongestion: '3',
        },
        {
          cafeId: '4',
          place: '스타벅스 홍대입구역점',
          lat: 37.55805,
          lng: 126.92472,
          averageCongestion: '0',
        },
        {
          cafeId: '5',
          place: '성수점 카페',
          lat: 37.544665,
          lng: 127.057641,
          averageCongestion: '1',
        },
        {
          cafeId: '6',
          place: '파스쿠찌 성수점',
          lat: 37.545335,
          lng: 127.056747,
          averageCongestion: '2',
        },
        {
          cafeId: '7',
          place: '도우터 성수점',
          lat: 37.544321,
          lng: 127.055678,
          averageCongestion: '3',
        },
        {
          cafeId: '8',
          place: '스타벅스 성수점',
          lat: 37.544189,
          lng: 127.057641,
          averageCongestion: '0',
        },
        {
          cafeId: '9',
          place: '연남점 카페',
          lat: 37.564151,
          lng: 126.926535,
          averageCongestion: '1',
        },
        {
          cafeId: '10',
          place: '파스쿠찌 연남점',
          lat: 37.565302,
          lng: 126.924933,
          averageCongestion: '2',
        },
        {
          cafeId: '11',
          place: '도우터 연남점',
          lat: 37.563478,
          lng: 126.926123,
          averageCongestion: '3',
        },
        {
          cafeId: '12',
          place: '스타벅스 연남점',
          lat: 37.563928,
          lng: 126.925057,
          averageCongestion: '0',
        },
      ];

      // SVG 이미지를 icon으로 구글 맵 마커 찍기
      // 카페 위치 마커 찍기
      locations.forEach((data) => {
        const markerText = data.place;
        // SVG 태그를 동적으로 생성
        const markerElement = document.createElement('div');
        markerElement.innerHTML = markerText;
        const markerTextContent = markerElement.textContent || '';
        const cafeSvg = tagSvgRaw(markerTextContent, data.averageCongestion);

        // elint error : marker객체 정의만 함
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const marker = new window.google.maps.Marker({
          position: { lat: data.lat, lng: data.lng },
          map,
          icon: {
            url: encodeSVG(cafeSvg),
            scaledSize: new window.google.maps.Size(181, 65),
          },
        });

        // 마커 클릭했을 때
        function handleMarkerClick() {
          console.log('클릭한 마커의 cafeId:', data.cafeId);
          // 마커 클릭하면 카페 id를 리덕스 저장
          dispatch(setCafeId({ cafe_id: data.cafeId }));
        }
        marker.addListener('click', handleMarkerClick);
      });

      // 홍대 버튼 클릭했을 때
      const handleHongdaeButtonClick = () => {
        map.setCenter({ lat: 37.557361, lng: 126.924633 });
        map.setZoom(17);
      };

      // 성수 버튼 클릭했을 때
      const handleSeongsuButtonClick = () => {
        map.setCenter({ lat: 37.544665, lng: 127.057641 });
        map.setZoom(17);
      };

      // 연남 버튼 클릭했을 때
      const handleYeonnamButtonClick = () => {
        map.setCenter({ lat: 37.560907, lng: 126.924619 });
        map.setZoom(17);
      };

      // 컨트롤 위치 및 스타일 조정
      const customControlsDiv = document.createElement('div');
      customControlsDiv.classList.add('custom-map-controls');

      createRoot(customControlsDiv).render(
        <LocationButtonGroup
          hongdaeFunc={handleHongdaeButtonClick}
          seongsuFunc={handleSeongsuButtonClick}
          yeonnamFunc={handleYeonnamButtonClick}
        />
      );

      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
        customControlsDiv
      );
    }

    window.initMap = initMap;

    const loadGoogleMapScript = () => {
      if (window.google && window.google.maps) {
        window.initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // 스크립트 로드가 완료되면 initGoogleMap 함수를 호출
        window.initMap();
      };

      script.onerror = () => {
        console.error('Failed to load Google Maps API script.');
      };

      document.body.appendChild(script);
    };

    // 컴포넌트가 마운트될 때 Google 맵 스크립트를 로드
    loadGoogleMapScript();

    // 컴포넌트가 언마운트될 때 Google 맵 스크립트를 제거
    return () => {
      const script = document.querySelector(
        'script[src^="https://maps.googleapis.com/maps/api/js"]'
      );
      if (script) {
        script.parentNode?.removeChild(script);
      }
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default GoogleMapComponent;
