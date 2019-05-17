const db = require("../data/dbConfig.js");

module.exports = {
  getAll,
  findBy,
  findById,
  add,
  edit,
  remove
};

async function getAll(userId) {
  console.log("In getAll");
  const data = await db("exerciseEntries")
    .join("users", { exercise_entry_user_id: "users.id" })
    .where({ "users.id": userId });
  const returnedData = data.map(d => {
    return {
      id: d.id,
      name: d.exerciseName,
      date: d.exerciseEntryDate,
      caloriesBurned: d.caloriesBurned,
      user: {
        id: d.exercise_entry_user_id,
        email: d.email,
        username: d.username,
        firstName: d.firstName,
        lastName: d.lastName,
        userType: d.userType,
        calorieGoal: d.calorieGoal,
        weight: d.weight
      }
    };
  });
  return returnedData;
}

async function findBy(filter, value, userId) {
  const data = await db("exerciseEntries")
    .join("users", { exercise_entry_user_id: "users.id" })
    .where({ [filter]: value })
    .where({ "users.id": userId })
    .first();
  if (data) {
    const returnedData = {
      id: data.id,
      name: data.exerciseName,
      date: data.exerciseEntryDate,
      caloriesBurned: data.caloriesBurned,
      user: {
        id: data.exercise_entry_user_id,
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        userType: data.userType,
        calorieGoal: data.calorieGoal,
        weight: data.weight
      }
    };
    return returnedData;
  }
  return null;
}

async function findById(id, userId) {
  const data = await db("exerciseEntries")
    .join("users", { exercise_entry_user_id: "users.id" })
    .where({ "exerciseEntries.id": id })
    .where({ "users.id": userId })
    .first();
  if (data) {
    const returnedData = {
      id: data.id,
      name: data.exerciseName,
      date: data.exerciseEntryDate,
      caloriesBurned: data.caloriesBurned,
      user: {
        id: data.exercise_entry_user_id,
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        userType: data.userType,
        calorieGoal: data.calorieGoal,
        weight: data.weight
      }
    };
    return returnedData;
  }
  return null;
}

async function add(exerciseEntry) {
  const [id] = await db("exerciseEntries").insert(exerciseEntry, "id");

  return findById(id);
}

async function edit(id, changes) {
  await db("exerciseEntries")
    .where("id", id)
    .update(changes);

  return findById(id);
}

function remove(id) {
  return db("exerciseEntries")
    .where("id", id)
    .del();
}
