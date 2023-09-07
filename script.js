// let countryName= document.getElementById('cityname');

function search() {
  let countryName = document.getElementById("cityname");
  console.log(countryName.value);
  let key = "82005d27a116c2880c8f0fcb866998a0";
  let url = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

  checkWeather();

  async function checkWeather() {
    try {
      const responce = await fetch(
        url + `&appid=${key}` + `&q=${countryName.value}`
      );
      let data = await responce.json();
      console.log(data);

      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
      document.getElementById("weatherpng").src = iconUrl;

      document.getElementById("location").innerHTML = data?.name;
      document.getElementById("temperature").innerHTML = data?.main.temp + "°C";
      document.getElementById("temperaturedescription").innerHTML =
        data?.weather[0].description;
      document.getElementById("country").innerHTML = data?.sys.country;

      if (data?.weather[0].description === "clear sky") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('blue.jpg')";
      }
      if (data.weather[0].description === "few clouds") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('v983-002.jpg')";
      }
      if (data.weather[0].description === "overcast clouds") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('cloud.png')";
      }

      if (data.weather[0].description === "haze") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('6004798.jpg')";
      }
      if (data.weather[0].description === "mist") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('x.jpg')";
      }
      if (data.weather[0].description === "scattered clouds") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('blue.jpg')";
      }
      if (data.weather[0].description === "broken clouds") {
        document.getElementById("bigbox").style.backgroundColor = "yellow";
      }
      if (
        data.weather[0].description === "moderate rain" ||
        data.weather[0].description === "light intensity drizzle" ||
        data.weather[0].description === "rain"
      ) {
        document.getElementById("bigbox").style.backgroundImage =
          "url('rain.jpg')";
      }
      document.getElementById("displaycontainer").style.display = "block";
      document.getElementById("hide").style.display = "none";
    } catch (error) {
      document.getElementById("displaycontainer").style.display = "none";
      document.getElementById("hide").style.display = "block";
      console.log(error);
      console.log("jf,f");
    }
  }
}

getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeatherData);
  } else {
    alert("error ");
  }
}

function fetchWeatherData(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const apiKey = "82005d27a116c2880c8f0fcb866998a0";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  checkWeather();

  async function checkWeather() {
    try {
      const responce = await fetch(apiUrl);
      let data = await responce.json();
      console.log(data);

      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
      document.getElementById("weatherpng").src = iconUrl;

      document.getElementById("location").innerHTML = data?.name;
      document.getElementById("temperature").innerHTML = data?.main.temp + "°C";
      document.getElementById("temperaturedescription").innerHTML =
        data?.weather[0].description;
      document.getElementById("country").innerHTML = data?.sys.country;
    } catch (error) {
      document.getElementById("displaycontainer").style.display = "none";
      document.getElementById("hide").style.display = "block";
      console.log(error);
      console.log("jf,f");
    }
  }
}
