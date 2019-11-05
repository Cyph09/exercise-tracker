const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");
const exerciseRoutes = require("./routes/exercise");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.json("Exercise tracker");
});
app.use("/api/exercise", exerciseRoutes);

// Error handler midleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});
// Server and Database connection
app.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("> error occurred from the database");
});

db.once("open", () => {
  console.log(`App running on port ${config.PORT}`);
});
