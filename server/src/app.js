const express = require("express");
const planetsrouter = require("./routes/planets/planets.router");
const app = express();
const cors = require("cors");

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(planetsrouter);

module.exports = app;
