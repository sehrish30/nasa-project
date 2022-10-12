const fs = require("fs");
const { join } = require("path");
const { parse } = require("csv-parse");

const habitablePlanets = [];
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(join(__dirname, "..", "data", "kepler_data.csv"))
      // read the file to be connected to another stream
      // writeable rows
      // destination will return JSON data
      // readable.pipe(writeable)
      // returns parsed data
      .pipe(
        parse({
          comment: "#",
          columns: true, // return each row as javascript object rather than just an array of values
        })
      )
      .on("data", (data) => {
        results.push(data);
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log("habitablePlanets", habitablePlanets.length);
        // need to parse the results
        resolve(habitablePlanets);
      });
  });
}

const results = [];
// read the file as a stream

module.exports = {
  planets: habitablePlanets,
  loadPlanetsData,
};
