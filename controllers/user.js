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
  const { username } = req.body;
  const user = new User({ username });
  user
    .save()
    .then(result => {
      res.status(201).json({ message: "User successfully added", result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editUser = (req, res, next) => {
  // check for validaton errors
  const userId = req.params.userId;
  const { userName } = req.body;
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      user.userName = userName;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: "Usename updated successfulyy", result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.removeUser = (req, res, next) => {
  res.json("Remove user");
};
