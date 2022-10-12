const express = require("express");
const planetsrouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// default to combined
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/planets", planetsrouter);
// router mounted on /launches
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
