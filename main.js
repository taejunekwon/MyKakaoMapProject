// main.js

const mapContainer = document.getElementById('map');
const options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
};
const map = new kakao.maps.Map(mapContainer, options);

// 특정 지정공업사 위치 좌표 (예: 서울 강남구 역삼동)
const customPlaceLatLng = new kakao.maps.LatLng(37.498498, 127.028180);

// 초기화면에 특정 위치 마커 표시
displayMarker(customPlaceLatLng);

function searchLocation() {
    // searchLocation 함수는 더 이상 사용되지 않음
    // 원하는 위치는 이미 초기화면에 마커로 표시됨
}

// 마커 표시 함수
function displayMarker(position) {
    const marker = new kakao.maps.Marker({
        map: map,
        position: position,
    });

    // 마커에 표시할 커스텀 컨텐츠 설정 가능
    // 예시: 마커 위에 정보창 표시
    const infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">내가 원하는 공업사</div>',
    });

    // 마커에 클릭 이벤트 등록
    kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });

    // 지도 중심 위치 설정
    map.setCenter(position);
}
이 예제에서는 customPlaceLatLng 상수를 사용하여 특정 지정공업사의 위치를 설정하고, 해당 위치에 대한 마커를 초기화면에 표시합니다. displayMarker 함수에서는 마커를 생성하고 정보창을 설정하며, 이를 마커 클릭 이벤트와 연결합니다.

User
내가 검색한 위치 인근에 공업사가 표시 되게 할거야 
ChatGPT
알겠습니다. 아래는 사용자가 검색한 위치 주변에 지정된 공업사가 표시되도록 수정한 코드입니다. 사용자가 검색한 위치 주변에 공업사를 표시하기 위해 searchLocation() 함수가 사용됩니다.

javascript
Copy code
// main.js

const mapContainer = document.getElementById('map');
const options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
};
const map = new kakao.maps.Map(mapContainer, options);

// 특정 지정공업사 위치 좌표 (예: 서울 강남구 역삼동)
const customPlaceLatLng = new kakao.maps.LatLng(37.498498, 127.028180);

// 초기화면에 특정 위치 마커 표시
displayMarker(customPlaceLatLng);

// 검색한 위치 주변에 공업사 표시
function searchLocation() {
    const keyword = document.getElementById('searchInput').value;

    // 사용자가 검색한 위치 주변으로 검색하기 위해 키워드와 검색 함수 변경
    const ps = new kakao.maps.services.Places();
    ps.locationSearch(keyword, placesSearchCB);
}

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
    }
}

function displayMarker(place) {
    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
    });

    const infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">내가 원하는 공업사</div>',
    });

    kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}