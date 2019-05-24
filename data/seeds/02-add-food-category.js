exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("foodCategories")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("foodCategories").insert([
        { foodCategoryName: "Fruits" },
        { foodCategoryName: "Vegetables" },
        { foodCategoryName: "Grains" },
        { foodCategoryName: "Protein" },
        { foodCategoryName: "Dairy" }
      ]);
    });
};
