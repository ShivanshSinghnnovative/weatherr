// let countryName= document.getElementById('cityname');

async function fetchWeather(location) {
  try {
    console.log(location);
    document.getElementById("weatherpng").src = "loading.png";
    document.getElementById("displaycontainer").style.display = "block";
    document.getElementById("hide").style.display = "none";
    const key = "82005d27a116c2880c8f0fcb866998a0";
    let url;

    if (typeof location === "string") 
    {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;
    } 
    else if (typeof location === "object") {
      console.log(location);
      console.log("dd");
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    }

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      outputData(data);
      if (data.weather[0].description === "clear sky") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('blue.jpg')";
      } else if (data.weather[0].description === "few clouds") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('v983-002.jpg')";
      } else if (data.weather[0].description === "overcast clouds") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('cloud.png')";
      } else if (data.weather[0].description === "haze") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('6004798.jpg')";
      } else if (data.weather[0].description === "mist") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('x.jpg')";
      } else if (data.weather[0].description === "scattered clouds") {
        document.getElementById("bigbox").style.backgroundImage =
          "url('blue.jpg')";
      } else if (data.weather[0].description === "broken clouds") {
        document.getElementById("bigbox").style.backgroundColor = "yellow";
      } else if (
        data.weather[0].description === "moderate rain" ||
        data.weather[0].description === "light intensity drizzle" ||
        data.weather[0].description === "rain"
      ) {
        document.getElementById("bigbox").style.backgroundImage =
          "url('rain.jpg')";
      } else {
        document.getElementById("bigbox").style.backgroundColor = "black";
      }
    } else {
      document.getElementById("weatherpng").src = "loading.png";
      document.getElementById("displaycontainer").style.display = "none";
      document.getElementById("hide").style.display = "block";
      console.log(error);
      console.log("jf,f");
    }
  } catch (error) {
    document.getElementById("weatherpng").src = "loading.png";
    document.getElementById("displaycontainer").style.display = "none";
    document.getElementById("hide").style.display = "block";
    console.log(error);
    console.log("jf,f");
  }
}

function search() {
  const cityName = document.getElementById("cityname").value;
  document.getElementById("weatherpng").src = "loading.png";
  if (cityName) {
    fetchWeather(cityName);
  }
}
getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (position) => {
        fetchWeather(position);
      },
      () => showError("Geolocation error")
    );
  } else {
    document.getElementById("weatherpng").src = "loading.png";
    document.getElementById("displaycontainer").style.display = "none";
    document.getElementById("hide").style.display = "block";
    console.log(error);
    console.log("jf,f");
  }
}

function outputData(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
  document.getElementById("weatherpng").src = iconUrl;

  document.getElementById("location").innerHTML = data?.name;
  document.getElementById("temperature").innerHTML = data?.main.temp + "°C";
  document.getElementById("temperaturedescription").innerHTML =
    data?.weather[0].description;
  document.getElementById("country").innerHTML = data?.sys.country;
}
