const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

// it helps us to use web sockets other type of connection
// middlewares or route handlers that i attach to app object
// will respond to our requests coming in to our server
// express is a fancy listener function for our http node server
const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://nasa:nasa-api@cluster0.h0sil0s.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
