const User = require("../models/user");
const Exercise = require("../models/exercise");

exports.getUserExercises = (req, res, next) => {
  const { userId, startDate, endDate, limit } = req.query;
  let totalUserExercises;

  const query = { user: userId };

  if (startDate) {
    query.date = { $gte: new Date(startDate) };
  }

  if (endDate) {
    query.date = { $lt: new Date(endDate) };
  }

  Exercise.find(query)
    .limit(parseInt(limit, 10) || 10)
    .countDocuments()
    .then(count => {
      totalUserExercises = count;
      return Exercise.find(query).limit(parseInt(limit, 10) || 10);
    })
    .then(exercises => {
      if (!exercises.length) {
        const error = new Error("Currently the user has no any exercise.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "User exercises fetched successfully",
        user: {
          totalExercises: totalUserExercises,
          exercises: exercises
        }
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
