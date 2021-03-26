const Cars = require('./cars-model');
var vinValidator = require('vin-validator');


async const checkCarId = (req, res, next) => {
	// !! DO YOUR MAGIC
  try {
    const car = await Cars.getById(req.params.id)
    if (car) {
      req.car = car
      next()
    } else {
      next({ ...Error(), status: 404, message: `Car with ID ${req.car.id} is not found`})
    }
  }
  catch (err) {
    next({ ...err, status: 500, message: 'Error processing request'})
  }
};

const checkCarPayload = (req, res, next) => {
	// !! DO YOUR MAGIC
    const newCar = req.body
    if ( !newCar.vin) {
      next({ ...Error(), status: 400, message: `Car vin number is missing`})
    } else if (!newCar.make) {
      next({ ...Error(), status: 400, message: `Car make is missing`})
    } else if (!newCar.model) {
      next({ ...Error(), status: 400, message: `Car model is missing`})
    } else if(!newCar.milage) {
      next({ ...Error(), status: 400, message: `Car milage is missing`})
    } else {
      res.status(200).json(newCar)
      next()
    }
  };

const checkVinNumberValid = (req, res, next) => {
	// !! DO YOUR MAGIC
  var isValidVin = vinValidator.validate(`${req.params.vin}`); 
  if (isValidVin === false) {
    next({ ...Error(), status: 400, message: `vin ${req.params.vin} is invalid`})
  } else {
    next()
  }
  }


const checkVinNumberUnique = (req, res, next) => {
	// !! DO YOUR MAGIC
  const vin = Cars.getAll(req.params.vin)
  if(vin) {
    next({ ...Error, status: 400, messgage: `vin ${req.params.vin} already exists`})
  } else {
    next()
  }
};
