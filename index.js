const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log('It worked! Returned IP:' , ip);

});

fetchCoordsByIP('103.102.59.45', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log('It worked! Returned coords:' , data);

});

const coords = {
  lat: 22.3595863,
  lng: 72.9002836
}
fetchISSFlyOverTimes(coords, (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log('It worked! The fly over times:' , data);

});
