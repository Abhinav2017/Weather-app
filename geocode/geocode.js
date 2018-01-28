const request = require('request');

var geocodeAddress = (address,callback) => {
  var encodedAddress = encodeURIComponent(address);
request({
  url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json:true
},(error,response,body) => {

  // console.log(JSON.stringify(body,undefined,3));
  if(error )
  {
    callback('Error connecting google servers');
  }
  else if(body.status === 'ZERO_RESULTS')
  {
    callback('Address not found.');
  }
  else if(body.status==='OK') {
    callback(undefined,{
      address:body.results[0].formatted_address,
      Latitude:body.results[0].geometry.location.lat,
      Longitude: body.results[0].geometry.location.lng
    });
  }
  else
    {
      console.log('Page not found');
    }
  })};

// module.exports.geocodeAddress= geocodeAddress;   --also we can write in this way
module.exports = {
  geocodeAddress
};
