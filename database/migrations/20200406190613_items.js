
exports.up = function(knex, Promise) {
    return knex.schema.createTable('items', (tbl) => {
        tbl.increments('id').unique().notNullable();
        tbl.text('name').notNullable();
        tbl.integer('quantity');
        tbl.integer('user_id').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('items');
};
