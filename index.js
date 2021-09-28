const ipInfo = document.querySelector(".ip-info");
const locationInfo = document.querySelector(".location-info");
const timelineInfo = document.querySelector(".timeline-info");
const ispInfo = document.querySelector(".isp-info");
const tempInfo = document.querySelector(".temp-info");
const tempImg = document.querySelector("#temp-icon");

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", function () {
  displayInfo(searchInput.value);
});

// /****** Generate Info *******/
const displayInfo = function (value) {
  const apiKey =
    "https://geo.ipify.org/api/v1?apiKey=at_xkvL0GYwwZs9go5tf0J1hPp7Jo8ta&ipAddress=";
  const key = value;
  let lat, lng;
  fetch(apiKey + key)
    .then((res) => res.json())
    .then((data) => {
      lat = data.location.lat;
      lng = data.location.lng;

      ipInfo.textContent = data.ip;
      locationInfo.textContent = `${data.location.city}, ${data.location.region} ${data.location.country}`;
      timelineInfo.textContent = `UTC${data.location.timezone}`;
      ispInfo.textContent = data.isp;
      displayMap(lat, lng);
      showTemp(data.location.region);
    })
    .catch((err) => {
      console.log(err);
      alert("Please refresh before enter new IP Address to reload the map");
    });
};

// /********** Generate The map api ***********/
let displayMap = function (a, b) {
  var mymap = L.map("mapid").setView([a, b], 10);
  var marker = L.marker([a, b]).addTo(mymap);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoidG91bG91OTExIiwiYSI6ImNrdTJlcWk4bDF4b2cyb3RoY3RjdjhjdWcifQ.2uq49ClizrGXWvbpMxOT_A",
    }
  ).addTo(mymap);
};

/***********Weather Infomation  ******/
const showTemp = function (city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1a34f479dc610643c75c7d8df51b8ce7`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      var temperature = Math.trunc(data.main.temp - 273);
      //console.log(temperature + "°C");
      tempInfo.textContent = `${temperature} °C`;
      tempImg.src =
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      // document.querySelector("#weather-icon").src =
      //   "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    })
    .catch((err) => {
      console.log(err);
    });
};
