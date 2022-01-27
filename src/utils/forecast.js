const request = require('request');

const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=a3c20a20d2bc04c3f152bee69ef899b1&query=' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + '&units=f';

  request({ url, json: true }, (error, {body}) => {
  
    // Error handling
    if (error) {
      callback('Unable to connect to the weather service', undefined);
    } else if (body.error){
      callback('Unable to find location.', undefined);
    } else {
      const current = body.current;
      const {weather_descriptions, temperature, feelslike} = current
      callback(undefined, weather_descriptions + '. It is currently ' + temperature + 'F degrees out. It feels like ' + feelslike + 'F degrees out.')
    }

  });
}

module.exports = forecast;