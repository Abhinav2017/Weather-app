const yargs = require('yargs');
const axios = require('axios');



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

var encodedAddress = encodeURIComponent(argv.a);

var geoCodeURL= `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geoCodeURL).then((response)=>{
  if(response.data.status==='ZERO_RESULTS')
  {
    throw new Error('Unable to find address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

 var weatherURL = `https://api.darksky.net/forecast/7737bb52ad7ec3d7c570cffa0af21b59/${lat},${lng}`;
 return axios.get(weatherURL);
  console.log(response.data);
}).then((responseobj)=>{
  var temp = responseobj.data.currently.temperature;
  var appTemp = responseobj.data.currently.apparentTemperature;
  console.log(`The temperature of ${encodedAddress} is ${temp} but it feels like ${appTemp}`);
  console.log(responseobj.data.hourly.summary);
}).catch((e)=>{
  if(e.code ==='ENOTFOUND')
  {
    console.log('Unable to find API servers');
  }
  else {
    console.log(e.message);
  }
})

// console.log(geoCodeURL.results[0].geometry.location.lat);
// console.log(geoCodeURL.results[0].geometry.location.lng);


// var weatherURL = `https://api.darksky.net/forecast/7737bb52ad7ec3d7c570cffa0af21b59/${lat},${long}`;
