const Poster = require("../models/poster");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpeg and .jpg format allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const createPoster = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image." });
    }

    const { filename, originalname, mimetype } = req.file;

    const newPoster = new Poster({
      title,
      description,
      image: {
        filename,
        originalname,
        mimetype,
      },
    });

    await newPoster.save();

    res.status(201).json(newPoster);
  } catch (error) {
    console.error("Error creating poster:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPosters = async (req, res) => {
  try {
    const posters = await Poster.find();
    res.json(posters);
  } catch (error) {
    console.error("Error fetching posters:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePoster = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPoster = await Poster.findByIdAndDelete(id);

    if (!deletedPoster) {
      return res.status(404).json({ message: "Poster not found" });
    }

    const imagePath = path.join(
      __dirname,
      "../uploads/",
      deletedPoster.image.filename
    );

    // Check if the file exists before attempting to delete
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`Deleted image file: ${imagePath}`);
    } else {
      console.log(`Image file not found: ${imagePath}`);
    }

    res.json({ message: "Poster and image deleted successfully" });
  } catch (error) {
    console.error("Error deleting poster:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  upload: upload.single("image"),
  createPoster,
  getPosters,
  deletePoster,
};
