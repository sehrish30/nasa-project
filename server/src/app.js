const express = require("express");
const planetsrouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const api = require("./routes/api");
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

// router mounted  v1
app.use("/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
