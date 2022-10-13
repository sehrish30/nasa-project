const fs = require("fs");
const { join } = require("path");
const { parse } = require("csv-parse");
const planets = require("./planets.mongo");

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
      .on("data", async (data) => {
        results.push(data);
        if (isHabitablePlanet(data)) {
          savePlanet(data);
          // habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log("habitablePlanets", countPlanetsFound);
        // need to parse the results
        resolve(countPlanetsFound);
      });
  });
}

async function savePlanet(planet) {
  try {
    // upsert = update + insert
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
}

async function getAllPlanets() {
  return await planets.find({});
  // return await planets.find(
  //   {
  //     keplerName: "Kepler-62 f",
  //   },
  //   "keplerName"
  //   // {
  //   //   // projection
  //   //   keplerName: 1,
  //   // }
  // );
}

const results = [];
// read the file as a stream

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
