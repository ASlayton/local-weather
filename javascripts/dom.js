const convert = require('./convert');

const createTile = (data) => {
  let myString = '';
  const weatherIcon = data.weather[0].icon;
  const myTemp = convert(data.main.temp);

  myString += `<div class="col-sm-6 col-md-4">`;
  myString += `<div class="thumbnail">`;
  myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${data.weather[0].main}">`;
  myString +=   `<div class="caption">`;
  myString +=     `<h3>${data.name}</h3>`;
  myString +=     `<p>${data.weather[0].main}</p>`;
  myString +=     `<p>Temperature: ${myTemp}</p>`;
  myString +=     `<p>Pressure: ${data.main.pressure}</p>`;
  myString +=     `<p>Wind Speed: ${data.wind.speed}</p>`;
  myString +=     `<a>View 5 day forcast</a>`;
  myString +=   `</div>`;
  myString += `</div>`;
  myString += `</div>`;

  printToDom(myString);
};

const printToDom = (dataString) => {
  $('#weather-display-container').html(dataString);
};

module.exports = {
  createTile,
};
