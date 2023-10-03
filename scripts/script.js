
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

var forecast = null;
var historyW = null;

function searchBtnOnclick() {
    var q = searchField.value;
    $.ajax({
        method: "GET",
        url: "http://api.weatherapi.com/v1/current.json?key=11752677f3424537a17155149231909&q=" + q,
        success: (resp) => {
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

    $.ajax({
        method: "GET",
        url: "http://api.weatherapi.com/v1/forecast.json?key=11752677f3424537a17155149231909&q=" + q + "&days=3",
        success: (resp) => {
            console.log(JSON.stringify(resp));

            forecast = resp.forecast.forecastday;

            populateForecast();
        }


    })

    var dateMin7 = new Date();
    dateMin7.setDate(dateMin7.getDate() - 7);

    var dateMin1 = new Date();
    dateMin1.setDate(dateMin1.getDate() - 1);


    $.ajax({
        method: "GET",
        url: "http://api.weatherapi.com/v1/history.json?key=11752677f3424537a17155149231909&q=" + q + "&dt=" + formatDate(dateMin7) + "&end_dt=" + formatDate(dateMin1),
        success: (resp) => {
            console.log(JSON.stringify(resp));

            historyW = resp.forecast.forecastday;

            populateHistory();
        }

    })

}


function populateForecast() {
    const forecastDate = document.getElementsByClassName("forecast-date");
    for (let i = 0; i < forecast.length; i++) {
        forecastDate[i].innerHTML = forecast[i].date;
    }
    const forecastImage = document.getElementsByClassName("forecast-image");
    for (let i = 0; i < forecast.length; i++) {
        forecastImage[i].src = forecast[i].day.condition.icon;
    }
    const forecastTemp = document.getElementsByClassName("forecast-temp");
    for (let i = 0; i < forecast.length; i++) {
        forecastTemp[i].innerHTML = Math.trunc(forecast[i].day.avgtemp_c);
    }
    const forecastCondition = document.getElementsByClassName("forecast-condition");
    for (let i = 0; i < forecast.length; i++) {
        forecastCondition[i].innerHTML = forecast[i].day.condition.text;
    }
    const forecastHumidity = document.getElementsByClassName("forecast-humidity");
    for (let i = 0; i < forecast.length; i++) {
        forecastHumidity[i].innerHTML = forecast[i].day.avghumidity + "%";
    }
    const forecastWindSpeed = document.getElementsByClassName("forecast-wind-speed");
    for (let i = 0; i < forecast.length; i++) {
        forecastWindSpeed[i].innerHTML = forecast[i].day.maxwind_kph + "km/h";
    }
    const forecastUVIndex = document.getElementsByClassName("forecast-uv-index");
    for (let i = 0; i < forecast.length; i++) {
        forecastUVIndex[i].innerHTML = forecast[i].day.uv;
    }
    const forecastVisibility = document.getElementsByClassName("forecast-visibility");
    for (let i = 0; i < forecast.length; i++) {
        forecastVisibility[i].innerHTML = forecast[i].day.avgvis_km + "km";
    }
    const forecastTotalPrecipitation = document.getElementsByClassName("forecast-precipitation");
    for (let i = 0; i < forecast.length; i++) {
        forecastTotalPrecipitation[i].innerHTML = forecast[i].day.totalprecip_mm + "mm";
    }

}

function populateHistory() {
    const historyDate = document.getElementsByClassName("history-date");
    for (let i = 0; i < historyW.length; i++) {
        historyDate[i].innerHTML = historyW[i].date;
    }
    const historyImage = document.getElementsByClassName("history-image");
    for (let i = 0; i < historyW.length; i++) {
        historyImage[i].src = historyW[i].day.condition.icon;
    }
    const historyTemp = document.getElementsByClassName("history-temp");
    for (let i = 0; i < historyW.length; i++) {
        historyTemp[i].innerHTML = Math.trunc(historyW[i].day.avgtemp_c);
    }
    const historyCondition = document.getElementsByClassName("history-condition");
    for (let i = 0; i < historyW.length; i++) {
        historyCondition[i].innerHTML = historyW[i].day.condition.text;
    }
    const historyHumidity = document.getElementsByClassName("history-humidity");
    for (let i = 0; i < historyW.length; i++) {
        historyHumidity[i].innerHTML = historyW[i].day.avghumidity + "%";
    }
    const historyWindSpeed = document.getElementsByClassName("history-wind-speed");
    for (let i = 0; i < historyW.length; i++) {
        historyWindSpeed[i].innerHTML = historyW[i].day.maxwind_kph + "km/h";
    }
    const historyUVIndex = document.getElementsByClassName("history-uv-index");
    for (let i = 0; i < historyW.length; i++) {
        historyUVIndex[i].innerHTML = historyW[i].day.uv;
    }
    const historyVisibility = document.getElementsByClassName("history-visibility");
    for (let i = 0; i < historyW.length; i++) {
        historyVisibility[i].innerHTML = historyW[i].day.avgvis_km + "km";
    }
    const historyTotalPrecipitation = document.getElementsByClassName("history-precipitation");
    for (let i = 0; i < historyW.length; i++) {
        historyTotalPrecipitation[i].innerHTML = historyW[i].day.totalprecip_mm + "mm";
    }



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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
