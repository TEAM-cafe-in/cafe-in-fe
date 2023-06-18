import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { RadioButton } from '~/components/atom/radioButton';

const GoogleMapComponent = () => {
  useEffect(() => {
    const initMap = () => {
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: 17,
          center: { lat: 37.5407622, lng: 127.0706095 },
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
      const locations = [
        {
          place: '건대입구역',
          lat: 37.539922,
          lng: 127.070609,
          status: 'average',
        },
        { place: '도우터', lat: 37.5407622, lng: 127.0706095, status: 'full' },
        {
          place: '스타벅스 건대입구역점',
          lat: 37.5406772,
          lng: 127.0694592,
          status: 'empty',
        },
        {
          place: '카페 베네 건대입구역점',
          lat: 37.540403,
          lng: 127.071219,
          status: 'unknown',
        },
      ];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < locations.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const marker = new google.maps.Marker({
          map,
          // label: locations[i].place,
          position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
          icon: {
            url: 'https://cdn.pixabay.com/photo/2013/07/13/09/51/drink-156144_640.png',
            scaledSize: new google.maps.Size(42, 42), // 이미지 크기 조정
          },
        });

        const contentString = `${ReactDOMServer.renderToString(
          <RadioButton text={locations[i].place} status={locations[i].status} />
        )}`;

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    };

    if (typeof google !== 'undefined') {
      initMap();
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '1000px', width: '100%' }} />

      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&callback=initMap`}
        async
      />
    </div>
  );
};
export default GoogleMapComponent;
