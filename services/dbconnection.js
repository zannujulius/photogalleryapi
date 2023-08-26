const mongoose = require("mongoose");
require("dotenv").config();

const DBString =
  process.env.NODE_ENV == "production"
    ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vflk9gz.mongodb.net/`
    : process.env.DB_LOCALSTRING;

const MONGO_URL = mongoose.connect(DBString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Mongodb connection ready");
});

mongoose.connection.on("error", (error) => {
  console.error("An error occured on the db", error);
});

async function mongoConnect() {
  await MONGO_URL;
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
