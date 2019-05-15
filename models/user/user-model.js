const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  findBy,
  getAll
};

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return db("users")
    .where({ id })
    .first();
}

function findBy(condition) {
  return db("users")
    .where(condition)
    .first();
}

function getAll() {
  return db("users");
}
