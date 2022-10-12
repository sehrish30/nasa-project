const express = require("express");
const planetsrouter = require("./routes/planets/planets.router");
const app = express();
const cors = require("cors");
const path = require("path");

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetsrouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
