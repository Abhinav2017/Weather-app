

const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const weather = require('./weather/weather');

const argv = yargs
.options({
  a:{
    demand:true,
    alias:'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help','h')
.argv;
var Address= geocode.geocodeAddress(argv.address, (errorMessage,results)=> {
  if(errorMessage)
  {
    console.log(errorMessage);
  }
  else {
    {
      console.log(results.address);
      var Rweather = weather.getWeather(results.Latitude,results.Longitude,(errorMessage,weatherResults)=>{
        if(errorMessage)
        {
          console.log(errorMessage);
        }
        else {
          var resultsDegCen = (weatherResults.Temp-32)*(5/9);
          console.log(`The temperature is ${resultsDegCen} Deg Celcius`);
          console.log(weatherResults.Summary);
        }
      });
    }
  }
});



// 7737bb52ad7ec3d7c570cffa0af21b59 --KEY
