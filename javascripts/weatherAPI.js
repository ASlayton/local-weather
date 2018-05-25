const dom = require('./dom');

let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
};

const showResults = (zipNum) => {
  searchWeather(zipNum)
    .then((result) => {
      dom.createTile(result);
    })
    .catch((err) => {
      console.error('Errors have occured', err);
    });
};

const searchWeather = (txt) => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.openweathermap.org/data/2.5/weather?zip=${txt},us&appid=${weatherKey}`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

module.exports = {
  showResults,
  setKey,
};
