module.exports = {
    ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 5000,
    MONGODB_URI:
      process.env.MONGODB_URI ||
    "mongodb://mhina:mhina123@localhost/exercise"
  };
  