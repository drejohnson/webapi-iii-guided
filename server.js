const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.orignalUrl}`);

  next();
}

function gateKeeper(req, res, next) {
  const { password } = req.header;
  console.log(password);

  next();
}

server.use(express.json());
// server.use(helmet());
server.use(logger);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get("/echo", (req, res) => {
  res.send(req.header);
});

server.get("/area51", gateKeeper(), (req, res) => {
  res.send(req.header);
});

module.exports = server;
