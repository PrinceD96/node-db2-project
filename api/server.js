const express = require("express");
const helmet = require("helmet");

const { logger } = require("./middleware/middleware");
const carsRouter = require("./routes/carsRouter");
const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());
server.use("/api/cars", carsRouter);

// Testing
server.get("/", (req, res) => {
	res.status(200).send("Hello there");
});

module.exports = server;
