const http = require("http");
const { app } = require("./app");
const { mongoConnect } = require("./services/dbconnection");
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoConnect();
    http.createServer({}, app).listen(PORT, () => {
      console.log("Server has started on " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
