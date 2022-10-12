const PORT = process.env.PORT || 8000;
const http = require("http");
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

// it helps us to use web sockets other type of connection
// middlewares or route handlers that i attach to app object
// will respond to our requests coming in to our server
// express is a fancy listener function for our http node server
const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();