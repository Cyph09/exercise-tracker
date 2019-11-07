const User = require("../models/user");
const Exercise = require("../models/exercise");

exports.getUserExercises = (req, res, next) => {
  const username = req.params.user;
  let userId;

  User.find({ username })
    .then(user => {
      if (!user.length) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      console.log(user);
      userId = user[0]._id;
      console.log(userId);
      return userId;
    })
    .then(() => {
      return Exercise.find({ user: userId });
    })
    .then(exercises => {
      if (!exercises) {
        const error = new Error("No exercise found.");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Exercises fetched successfully", exercises });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addExercise = (req, res, next) => {
  // TODO: check for validation errors
  const { username, description, duration, date } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      const userId = user._id;
      let createdDate = date ? date : new Date();
      const exercise = new Exercise({
        user: userId,
        description,
        duration,
        date: createdDate
      });
      return exercise.save();
    })
    .then(exercise => {
      res
        .status(201)
        .json({ message: "Exercise created successfully!", exercise });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editExercise = (req, res, next) => {
  // TODO: Check for validation errors
  const {}
};

exports.removeExercise = (req, res, next) => {
  res.json("remove Exercise");
};
