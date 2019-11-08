const User = require("../models/user");
const Exercise = require("../models/exercise");

exports.getUserExercises = (req, res, next) => {
  const username = req.params.user;
  let foundUser;
  let userId;
  let totalUserExercises;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }
      foundUser = user;
      userId = user._id;
      return userId;
    })
    .then(() => {
      return Exercise.find({ user: userId })
        .countDocuments()
        .then(count => {
          totalUserExercises = count;
          return Exercise.find({ user: userId });
        })
        .then(exercises => {
          if (!exercises.length) {
            const error = new Error("Currently the user has no any exercise.");
            error.statusCode = 404;
            throw error;
          }
          return exercises;
        })
        .then(exercises => {
          res.status(200).json({
            message: "User exercises fetched successfully",
            user: {
              username: foundUser.username,
              exercises: exercises,
              totalExercises: totalUserExercises
            }
          });
        });
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
        description,
        duration,
        date: createdDate,
        user: userId
      });
      exercise
        .save()
        .then(exercise => {
          console.log(exercise);
          return User.findById(userId);
        })
        .then(user => {
          user.exercises.push(exercise);
          return user.save();
        })
        .then(user => {
          res
            .status(201)
            .json({ message: "Exercise added successfully!", user });
        });
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
  // const {}
};

exports.removeExercise = (req, res, next) => {
  const exerciseId = req.params.exerciseId;
};
