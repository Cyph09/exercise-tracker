const User = require("../models/user");
const Exercise = require("../models/exercise");

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      if (users.length <= 0) {
        const error = new Error("No user found.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Users fetched successfully", users });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addUser = (req, res, next) => {
  // TODO: check validation errors
  const { username } = req.body;
  User.findOne({ username })
    .then(user => {
      if (user) {
        console.log(user);
        const error = new Error(
          "User already exists. Please choose another user name."
        );
        error.statusCode = 422;
        throw error;
      }
      user = new User({ username });
      return user.save();
    })
    .then(user => {
      res.status(201).json({ message: "User successfully added", user });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editUser = (req, res, next) => {
  // TODO: check for validaton errors
  const userId = req.params.userId;
  const { username } = req.body;
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      user.username = username;
      return user.save();
    })
    .then(user => {
      res.status(200).json({ message: "Username updated successfulyy", user });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.removeUser = (req, res, next) => {
  const userId = req.params.userId;
  // TODO: Handel validation errors
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      if (user.exercises.length) {
        Exercise.deleteMany({ _id: { $in: user.exercises } });
      }
      return User.deleteOne({ _id: userId });
    })
    .then(() => {
      res.status(200).json({ message: "User successfully deleted" });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
