const { nextISSTimesForMyLocation } = require('./iss_promised');

const printflyOverTime = function(flyOverTime) {
  for (const pass of flyOverTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((flyOverTime) => {
    printflyOverTime(flyOverTime);
  }).catch((error) => {
    console.log("It didn't work: ", error.message);
  });