//* import ExerciseEntry helper functions
const { AuthenticationError } = require("apollo-server");

const ExerciseEntry = require("../../models/exerciseEntriesModel");
const User = require("../../models/usersModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getExerciseEntries: authenticated(async (root, args, ctx) => {
      try {
        const entries = await ExerciseEntry.getAll(ctx.currentUser.id);
        return entries;
      } catch (err) {
        throw new AuthenticationError("Error fetching exercise entries", err);
      }
    }),

    getExerciseEntryBy: authenticated(async (root, args, ctx) => {
      try {
        const entry = await ExerciseEntry.findBy(args.filter, args.value, ctx.currentUser.id);
        return entry;
      } catch (err) {
        throw new AuthenticationError("Error fetching exercise entry by ", args.filter, err);
      }
    }),

    getExerciseEntryById: authenticated(async (root, args, ctx) => {
      try {
        const entry = await ExerciseEntry.findById(args.id, ctx.currentUser.id);
        console.log("entry: ", entry);
        return entry;
      } catch (err) {
        throw new AuthenticationError("Error fetching by id", err);
      }
    })
  },

  Mutation: {
    addExerciseEntry: async (root, args, ctx) => {
      const newEntry = {
        ...args.input,
        user: ctx.currentUser.id
      };
      const newExerciseEntry = await ExerciseEntry.add(newEntry);
      const userData = await User.findById(ctx.currentUser.id);
      console.log({ userData });
      return { ...newExerciseEntry, user: userData };
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

  // ExerciseEntry: {
  //   user: async (root, args, ctx) => {
  //     const user = await ExerciseEntry.findBy({ id: root.id });
  //     return user;
  //   }
  // }
};
