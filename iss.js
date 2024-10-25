
const needle = require('needle');
const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);  // Call the callback with the error
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = body.ip;
    callback(null, ip); // Success scenario
  });
};

module.exports = { fetchMyIP };