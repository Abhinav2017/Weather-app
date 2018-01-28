const request = require('request');

var getWeather = (lat,long,callback) => {
  request({
    // url:'https://api.darksky.net/forecast/7737bb52ad7ec3d7c570cffa0af21b59/25.1855032,75.8708242'
    url:`https://api.darksky.net/forecast/7737bb52ad7ec3d7c570cffa0af21b59/${lat},${long}`,
    json:true
  },(error,response,body) => {
    if(error)
    {
      callback('Error connecting forecas.io server');
    } else if(response.statusCode === 400) {
      callback('Unable to fetch weather.')
    } else if(response.statusCode=== 200) {
      callback(undefined,{
        Temp : body.currently.temperature,
        Summary : body.hourly.summary
      });
    } else {
      callback('Unexpected error');
    }


  });
};

module.exports = {
  getWeather
};
