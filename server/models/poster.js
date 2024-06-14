const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    default: "",
  },
  originalname: {
    type: String,
    default: "",
  },
  mimetype: {
    type: String,
    default: "",
  },
});

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: imageSchema }, // Adjusted to use imageSchema directly
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Poster", postSchema);
