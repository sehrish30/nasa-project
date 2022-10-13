const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa:nasa-api@cluster0.h0sil0s.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoDisconnect() {
  await mongoose.disconnect();
}

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
