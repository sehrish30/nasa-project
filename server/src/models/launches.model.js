// const launches = new Map();
const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const launch = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  flightNumber: 100,
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

// let latestFlightNumber = launch.flightNumber;

// launches.set(launch.flightNumber, launch);

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flighNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const latestFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: latestFlightNumber,
  });

  // save our launch
  await saveLaunch(newLaunch);
}

async function saveLaunch(launch) {
  // check refrential intergity
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet was found");
  }
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function existLaunchWithId(launchId) {
  return await launches.findOne({
    flightNumber: launchId,
  });
}

async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,

  existLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
};
