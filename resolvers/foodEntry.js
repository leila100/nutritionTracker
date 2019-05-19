const { AuthenticationError } = require("apollo-server");

const FoodEntry = require("../models/foodEntriesModel");
const User = require("../models/usersModel");
const Food = require("../models/foodsModel");
const MealCat = require("../models/mealCategoriesModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getFoodEntries: async (root, args, ctx) => {
      const foodEntries = await FoodEntry.getAll();
      return foodEntries;
    },

    getFoodEntriesById: async (root, args, ctx) => {
      const foodEntry = await FoodEntry.findById(args.id);
      return foodEntry;
    }
  },
  FoodEntry: {
    user: async (root, args, ctx) => {
      const owner = await User.findBy({ id: root.user_id });
      return owner;
    },
    food: async (root, args, ctx) => {
      const loggedFood = await Food.findBy({ id: root.food_id });
      return loggedFood;
    },
    mealCategory: async (root, args, ctx) => {
      const mealCat = await MealCat.findBy({ id: root.meal_category_id });
    }
  },

  Mutation: {
    addFoodEntry: async (root, args, ctx) => {
      const newFoodEntry = {
        ...args
      };
      const addedEntry = await FoodEntry.add(newFoodEntry);
      return addedEntry;
    },

    updateFoodEntry: async (root, args, ctx) => {
      const { id, data } = args;
      const foodEntry = await FoodEntry.edit(id, data);
      return foodEntry;
    },

    deleteFoodentry: async (root, { id }, ctx) => {
      const deleteEntry = await FoodEntry.remove(id);
      return deleteEntry;
    }
  }
};
