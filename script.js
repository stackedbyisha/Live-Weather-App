async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultBox = document.getElementById("resultBox");

  if (!city) {
    resultBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = "57a151ee07ac665fe3cbac2581a87ce0"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const temp = data.main.temp;
    const weather = data.weather[0].main;
    const icon = data.weather[0].icon;
     switch (weather.toLowerCase()) {
          case 'clear':
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?sunny,sky')";
            break;
          case 'clouds':
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?cloudy,clouds')";
            break;
          case 'rain':
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?rainy,raindrops')";
            break;
          case 'snow':
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?snow,winter')";
            break;
          case 'thunderstorm':
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?thunder,storm')";
            break;
          case 'mist':
          case 'fog':
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?fog,mist')";
            break;
          default:
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?nature')";
            break;
        }

    resultBox.innerHTML = `
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather}" />
      <p><strong>${weather}</strong></p>
      <p>🌡️ ${temp} °C</p>
    `;
  } catch (error) {
    resultBox.innerHTML = `<p>City not found. Please try again.</p>`;
  }
}
