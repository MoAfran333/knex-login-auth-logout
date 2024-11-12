exports.seed = async function (knex) {
  await knex("employees").del();
  await knex("employees").insert([
    { name: "Afran", email: "moafran@gmail.com", password: "12345", age: 22 },
    { name: "user2", email: "user2@test.com", password: "54321", age: 21 },
    { name: "user3", email: "user3@test.com", password: "34567", age: 24 },
  ]);
};
