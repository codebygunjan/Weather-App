const apiKey = "8afc3e3eb64256db00fb157e225a7d72";
const input = document.getElementById("inputText");
const btn = document.querySelector("#btn");
const temp = document.getElementById("temp");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const desc = document.getElementById("desc");

btn.addEventListener("click", fetchWeather);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchWeather();
  }
});

function fetchWeather() {
  const cityText = input.value.trim();
  if (!cityText) return alert("please enter a city name");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityText}&appid=${apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod && data.cod !== 200)
        return alert(data.message || "city not found");

      city.textContent = data.name;
      city.textContent = `${data.name} (${data.sys.country})`;
      temp.textContent = Math.round(data.main.temp) + "°C";
      humidity.textContent = data.main.humidity + "%";
      wind.textContent = Math.round(data.wind.speed) + " km/h";
      desc.textContent = data.weather[0].description;

      setweatherVisuals(data.weather[0].main);
    });
}

function setweatherVisuals(condition) {
          input.value = "";

  let gifUrl = "";
  switch (condition.toLowerCase()) {
    case "Thunderstorm":
      gifUrl = "https://media.giphy.com/media/3o6gDYJBQLIHFZoWL6/giphy.gif";
      break;
    case "Rain":
      gifUrl =
        "https://cdnl.iconscout.com/lottie/premium/thumb/rain-4013232-3317819.gif";
      break;
    case "clear":
      gifUrl =
        "https://th.bing.com/th/id/R.b502824fdd18a1d90e56266b55696180?rik=vnbKbePvJvln0A&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f4ib%2f6GE%2f4ib6GEbrT.gif&ehk=nyVz0NzhoEV%2fR8qwYSZO%2fQtoFtfGuJ6WFzWcDZZgEuY%3d&risl=&pid=ImgRaw&r=0";
      break;
    case "snow":
      gifUrl = "https://media0.giphy.com/media/eiMzTkBCN4lGg/giphy.gif";
      break;
    case "clouds":
      gifUrl =
        "https://i.gifer.com/origin/5a/5acfe63011eade003edd611df1ec0f9e_w200.gif";
      break;
    default:
      gifUrl =
        "https://i.gifer.com/origin/f4/f437524b815d9d77d659da4c3a0a9213_w200.gif";
        
  }

  const icon = document.getElementById("weatherIcon");
  icon.style.opacity = 0;
  setTimeout(() => {
    icon.src = gifUrl;
    icon.style.opacity = 1;
  }, 200);
}
