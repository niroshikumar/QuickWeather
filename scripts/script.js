
document.getElementById('btnDark').addEventListener('click', () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
});

document.getElementById('btnLight').addEventListener('click', () => {
    document.documentElement.setAttribute('data-bs-theme', 'light')
})


var map = L.map('map').setView([7.942904, 81.023326], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var lng = 7.942904;
var ltd = 81.023326;


const marker = L.marker([0, 0]).addTo(map);
marker.setLatLng([lng, ltd]).update();
map.setView([lng, ltd], 15);

//const locationName = $("#locationName");

const crntWeatherHumidity = $("#crntWeatherHumidity");
const crntWindSpeed = $("#crntWindSpeed");
const crntPressure = $("#crntPressure");
const crntFeelsLike = $("#crntFeelsLike");
const crntCloudCover = $("#crntCloudCover");
const crntVisibility = $("#crntVisibility");
const crntPrecipitation = $("#crntPrecipitation");
const crntTemperature = $("#crntTemperature");
const crntCondition = $("#crntCondition");
const crntImage = $("#crntImage");
const searchField = document.getElementById("searchField");

function searchBtnOnclick() {
    var q = searchField.value;
    $.ajax({
        method: "GET",
        url: "http://api.weatherapi.com/v1/current.json?key=11752677f3424537a17155149231909&q=" + q,
        success: (resp) => {
            console.log(JSON.stringify(resp));
            crntWeatherHumidity.text(resp.current.humidity + "%");
            crntWindSpeed.text(resp.current.wind_kph + "km/h");
            crntPressure.text(resp.current.pressure_mb + "mb");
            crntFeelsLike.text(resp.current.feelslike_c + "°C");
            crntCloudCover.text(resp.current.cloud + "%");
            crntVisibility.text(resp.current.vis_km + "km");
            crntPrecipitation.text(resp.current.precip_mm + "mm");
            crntTemperature.text(resp.current.temp_c);
            crntCondition.text(resp.current.condition.text);
            crntImage.attr('src', resp.current.condition.icon);
            searchField.value = resp.location.name;
        }

    })
}


function onLoad() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        searchField.value = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    searchField.value = "" + position.coords.latitude +
        "," + position.coords.longitude;;
    searchBtnOnclick();
}