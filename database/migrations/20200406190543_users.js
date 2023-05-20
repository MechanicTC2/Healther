
exports.up = function(knex) {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments('id').unique().notNullable();
        tbl.text('email').notNullable();
        tbl.string('password', 50);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
