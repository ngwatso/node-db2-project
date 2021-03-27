// ** STRETCH
exports.seed = function (knex) {
	return knex('cars')
		.truncate()
		.then(function () {
			return knex('cars').insert([
				{
					vin: '1234567890abcdefg',
					make: 'Chevy',
					model: 'Camaro',
					milage: '1234',
					title: 'Yes',
					transmission: 'manual',
				},
			]);
		});
};
