const express = require("express");

const {
  getUsers,
  addUser,
  editUser,
  removeUser
} = require("../controllers/user");

const {
  getUserExercises,
  addExercise,
  editExercise,
  removeExercise
} = require("../controllers/exercise");

const router = express.Router();

// Retrieve all users
router.get("/users", getUsers);

// Add new user
router.post("/new-user", addUser);

// Edit user
router.put("/edit-user/:userId", editUser);

// Remove user
router.delete("/remove-user/:userId", removeUser);

// Retrieve exercise log of a user
router.get("/log", getUserExercises);

// Add an exercise
router.post("/add", addExercise);

// Edit an exercise
router.put("edit-exercise/:exerciseId", editExercise);

// Remove an Exercise
router.delete("/remove-exercise/exerciseId", removeExercise);

module.exports = router;
