const Cars = require('./cars-model');
var vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
	// !! DO YOUR MAGIC
	try {
		const car = await Cars.getById(req.params.id);
		if (car) {
			req.car = car;
			next();
		} else {
			next({
				...Error(),
				status: 404,
				message: `Car with ID ${req.params.id} is not found`,
			});
		}
	} catch (err) {
		next({ ...err, status: 500, message: 'Error processing request' });
	}
};

const checkCarPayload = (req, res, next) => {
	// !! DO YOUR MAGIC
	const newCar = req.body;
	if (!newCar.vin) {
		next({
			...Error(),
			status: 400,
			message: `Car vin number is missing`,
		});
	} else if (!newCar.make) {
		next({ ...Error(), status: 400, message: `Car make is missing` });
	} else if (!newCar.model) {
		next({ ...Error(), status: 400, message: `Car model is missing` });
	} else if (!newCar.milage) {
		next({ ...Error(), status: 400, message: `Car milage is missing` });
	} else {
		next();
	}
};

const checkVinNumberValid = async (req, res, next) => {
	// !! DO YOUR MAGIC
	var isValidVin = await vinValidator.validate(`${req.body.vin}`);
	if (isValidVin === false) {
		next({
			...Error(),
			status: 400,
			message: `vin ${req.body.vin} is invalid`,
		});
	} else {
		next();
	}
};

const checkVinNumberUnique = async (req, res, next) => {
	// !! DO YOUR MAGIC
	const vin = await Cars.getAll();
	if (
		req.body.vin ===
		vin.forEach((car) => {
			return car.vin;
		})
	) {
		next({
			...Error,
			status: 400,
			messgage: `vin ${req.body.vin} already exists`,
		});
	} else {
		next();
	}
};

module.exports = {
	checkCarId,
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
};
