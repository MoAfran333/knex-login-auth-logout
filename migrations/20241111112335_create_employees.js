exports.up = function (knex) {
  return knex.schema.createTable("employees", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.integer("age");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("employees");
};
