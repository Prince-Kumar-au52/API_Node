const http = require("http");
// const dotenv=require("dotenv")
const app = require("./app");
const server = http.createServer(app);
const config = require("./config/config");

server.listen(config.PORT, () => {
  console.log(`server Start on ${config.PORT}`);
});
