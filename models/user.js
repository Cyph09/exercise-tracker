const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Exercise"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
