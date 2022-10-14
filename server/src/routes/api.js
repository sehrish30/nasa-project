const express = require("express");

const launchesRouter = require("./launches/launches.router");
const planetsRouter = require("./planets/planets.router");

const api = express.Router();

api.use("/planets", planetsRouter);
// router mounted on /launches
api.use("/launches", launchesRouter);

module.exports = api;
