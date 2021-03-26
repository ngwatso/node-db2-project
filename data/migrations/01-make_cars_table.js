// !! DO YOUR MAGIC

exports.up = function (knex) {
	return knex.schema.crfeateTable('cars', (tbl) => {
		tbl.increments();
		tbl.string('vin').unique().notNullable();
		tbl.string('make').notNullable();
		tbl.string('model').notNullable();
		tbl.integer('milage').notNullable();
		tbl.string('title');
		tbl.string('transmission');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('cars');
};
