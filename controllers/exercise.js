const User = require("../models/user");
const Exercise = require("../models/exercise");

exports.getUserExercises = (req, res, next) => {
  res.json("User's Exercise");
};

exports.addExercise = (req, res, next) => {
  res.json("Add new exercise");
};

exports.editExercise = (req, res, next) => {
  res.json("Edit Exercise");
};

exports.removeExercise = (req, res, next) => {
  res.json("remove Exercise");
};
