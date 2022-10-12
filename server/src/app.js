const express = require("express");
const planetsrouter = require("./routes/planets/planets.router");
const app = express();

//middlewares
app.use(express.json());
app.use(planetsrouter);

module.exports = app;
