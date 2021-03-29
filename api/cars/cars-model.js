const db = require('../../data/db-config');

const getAll = () => {
	// !! DO YOUR MAGIC
	return db('cars');
};

const getById = (id) => {
	// !! DO YOUR MAGIC
	return db('cars').first('*').where({ id });
};

const create = async (newCar) => {
	// !! DO YOUR MAGIC
	const cars = await db('cars').insert(newCar);
	return getById(cars[0]);
};

// TODO PUT

// TODO DELETE

module.exports = { getAll, getById, create };
