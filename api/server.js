const express = require('express');
const helmet = require('helmet');

// !! DO YOUR MAGIC

const CarsRouter = require('./cars/cars-router');

const server = express();

server.use(express.json());
server.use('/api/cars', CarsRouter);
server.use(helmet());

server.get('/', (req, res) => {
	res.status(200).json({ api: 'up' });
});

module.exports = server;
