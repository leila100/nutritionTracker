//* import ExerciseEntry helper functions
const { AuthenticationError, UserInputError } = require("apollo-server");

const ExerciseEntry = require("../../models/exerciseEntriesModel");
const Users = require("../../models/usersModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getExerciseEntries: async (root, args, ctx) => {
      const entries = await ExerciseEntry.getAll();
      return entries;
    },

    getExerciseEntryBy: async (root, args, ctx) => {
      const entry = await ExerciseEntry.findBy({ [args.filter]: args.value });
      return entry;
    },
    getExerciseEntryById: async (root, args, ctx) => {
      const entry = await ExerciseEntry.findById(args.id);
      return entry;
    }
  },
  ExerciseEntry: {
    user: async (root, args, ctx, info) => {
      const user = await Users.findById(root.exercise_entry_user_id);
      return user;
    }
  },

  Mutation: {
    addExerciseEntry: async (root, args, ctx) => {
      const newExerciseEntry = await ExerciseEntry.add(args.input);
      return newExerciseEntry;
    },

    updateExerciseEntry: async (root, args, ctx) => {
      const exerciseEntry = await ExerciseEntry.edit(args.id, args.changes);
      return exerciseEntry;
    },

    deleteExerciseEntry: async (root, args, ctx) => {
      const deletedCount = await ExerciseEntry.remove(args.id);
      return deletedCount;
    }
  }
};
