const needle = require('needle');

const fetchMyIP = function() {
  return needle('get','https://api.ipify.org?format=json')
    .then((response) => {
      const body = response.body; // get body value from response
      const ip = body.ip; // get ip from the body
      return ip;
    });
};

const fetchCoordsByIP = function(IP) {
  return needle('get',`http://ipwho.is/${IP}`)
    .then((response) => {
      const body = response.body; // get body value from response
      const coords = {  // get latitude an longitde from body and put it in coords object
        lat: body.latitude,
        lng: body.longitude
      };
      return coords;
    });
};

const fetchISSFlyOverTimes = function(coords) {
  return needle('get',`https://iss-flyover.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.lng}`)
    .then((response) => {
      const body = response.body; // get body value from response
      const flyOverTime = body.response;  // get fly over times  from body and put it in coords object
      return flyOverTime;
    });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((flyOverTime) => {
      return flyOverTime;
    });
};

module.exports = { nextISSTimesForMyLocation };