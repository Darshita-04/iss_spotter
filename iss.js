
const needle = require('needle');
const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);  // Call the callback with the error
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = body.ip;
    callback(null, ip); // Success scenario
    return ip;
  });
};


const fetchCoordsByIP = function(IP,callback) {
  needle.get(`http://ipwho.is/${IP}`, (error, response, body) => {
    if (error) {
      callback(error, null);  // Call the callback with the error
      return;
    }

    if (!body.success) {
      const msg = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(msg), null);
      return;
    }
    const coords = {
      lat: body.latitude,
      lng: body.longitude
    };
    
    callback(null, coords); // Success scenario
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  needle.get(` https://iss-flyover.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.lng}`, (error, response, body) => {
    if (error) {
      callback(error, null);  // Call the callback with the error
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Data. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, body.response); // Success scenario
  });
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };