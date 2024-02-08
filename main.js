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