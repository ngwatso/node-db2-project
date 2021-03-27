const express = require('express');
const Cars = require('./cars-model');
const Middleware = require('./cars-middleware');

const CarsRouter = express.Router();

// !! DO YOUR MAGIC

// ?? GET ==> /api/cars ==> Return array of cars
CarsRouter.get('/', (req, res, next) => {
	Cars.getAll()
		.then((cars) => {
			res.status(200).json(cars);
		})

		.catch((err) => {
			res.status(500).json({ message: 'Error retriving Cars' });
			next(err);
		});
});

// ?? GET ==> /api/cars/:id ==> Return car by given id
CarsRouter.get('/:id', Middleware.checkCarId, (req, res) => {
	res.status(200).json(req.car);
});

// ?? POST ==> /api/cars ==> Return created car ==> Leading or trailing whitespace on name trimmed
CarsRouter.post(
	'/',
	Middleware.checkCarPayload,
	Middleware.checkVinNumberUnique,
	Middleware.checkVinNumberValid,
	async (req, res) => {
		const newCar = await Cars.create(req.body);
		res.status(200).json(newCar);
	}
);

CarsRouter.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).json({
		message: err.message,
		stack: err.stack,
	});
});

module.exports = CarsRouter;
