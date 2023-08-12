// 카카오개발자센터 - https://developers.kakao.com/
// 카카오 지도 Web API - https://apis.map.kakao.com/web/guide/
const KAKAO_DEV_Javascript_KEY = 'ddfce4b5a6c589f7cbf109cf57486914';
const KAKAO_DEV_REST_API_KEY = '4531796c49d2ab4d025dc6ff13ab6cc3';
const LOCATION_JSON_URL = '/public/json/kakaomap_location.json';
let LOCATION_LIST;

(() => {
  const script = document.createElement('script');
  // https://apis.map.kakao.com/web/guide/#loadlibrary
  // services 라이브러리도 포함하여 불러오기
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_DEV_Javascript_KEY}&libraries=services`;
  document.write(script.outerHTML);
})();

window.addEventListener('DOMContentLoaded', (evt) => {
  loadLocationJson((result) => {
    LOCATION_LIST = result;
    loadGeoData();
  });

  /**
   * 장소 데이터 수신
   * @param callback
   */
  function loadLocationJson(callback) {
    fetch(LOCATION_JSON_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(`${response.status} | ${response.statusText}`);
        }
      })
      .then((data) => {
        if (callback) callback(data);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  /**
   * 주소 기반으로 위도 경도 등 좌표 데이터 수신
   * https://developers.kakao.com/docs/latest/ko/local/dev-guide#address-coord
   */
  function loadGeoData() {
    const geo_list = [];

    getGeo(LOCATION_LIST[0]);

    /**
     * Geo Data 로드
     * @param location_obj
     */
    function getGeo(location_obj) {
      if (typeof location_obj === 'undefined') return;

      const { 주소 } = location_obj;

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(주소, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const geo = result[0];
          geo_list.push(geo);
          Object.assign(location_obj, geo);

          const next_idx = geo_list.length;
          if (next_idx == LOCATION_LIST.length) {
            // 끝
            initKakaoMap();
          } else {
            // 다음 Geo 로드
            getGeo(LOCATION_LIST[next_idx]);
          }
        }
      });
    }
  }

  /**
   * 카카오맵 초기화
   */
  function initKakaoMap() {
    console.log(`LOCATION_LIST == `, LOCATION_LIST);

    const firstLatLng = GetLatLng(LOCATION_LIST[0]);

    // 맵 생성
    var map = creatMap(LOCATION_LIST[0]);

    // 마커 생성
    LOCATION_LIST.forEach((geo, idx) => {
      const marker = createMarker(geo);
    });

    /* 2023-08-11 :: START :: 중심이동 */
    window.addEventListener('resize', (evt) => {
      const latlng = GetLatLng(LOCATION_LIST[0]);
      // map.setCenter(latlng);// 곧장 이동
    });

    /* // 2023-08-11 :: END :: 중심이동 */

    /**
     * 지도 생성
     * https://apis.map.kakao.com/web/documentation/#Map
     */
    function creatMap(geo) {
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: GetLatLng(geo), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      return new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴;
    }

    /**
     * 마커 생성
     * https://apis.map.kakao.com/web/documentation/#Marker
     */
    function createMarker(geo) {
      if (typeof geo === 'undefined') {
        console.error('[kakaomap.js : createMarker] => geo is undefined');
        return;
      }

      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다
      var imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
      var imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 마커가 표시될 위치입니다
      var markerPosition = GetLatLng(geo);

      // 마커를 생성합니다
      var mk = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      const co = createCustomOverlay(geo);

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(mk, 'click', function () {
        // 커스텀 오버레이 띄우기
        co.setVisible(true);
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      mk.setMap(map);

      // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
      // mk.setMap(null);

      return mk;
    }

    /**
     * 커스텀 오버레이 생성
     * https://apis.map.kakao.com/web/documentation/#CustomOverlay
     */
    function createCustomOverlay(geo) {
      const { x, y, 장소명, 주소 } = geo;

      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      const content = `
      <div class="customoverlay">
        <a href="https://map.kakao.com/link/search/${주소}" target="_blank">
          <span class="title">${장소명}</span>
        </a>
      </div>
      `;

      // 커스텀 오버레이가 표시될 위치입니다
      var position = GetLatLng(geo);

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        // xAnchor: 0.49,
        // yAnchor: 0.3,
        yAnchor: 1,
        zIndex: 3,
      });

      // 가려두기
      customOverlay.setVisible(false);

      return customOverlay;
    }
  }
});

function GetLatLng(geo) {
  const lat = geo.y; // 위도
  const lng = geo.x; // 경도
  return new kakao.maps.LatLng(lat, lng);
}

function MoveKakaoMapMarker(장소명) {
  const geo = LOCATION_LIST.filter((obj) => {
    return 장소명 == obj.장소명;
  })[0];
  const latlng = GetLatLng(geo);
  map.panTo(latlng); // 부드럽게 이동
}
