const express = require("express");
const router = express.Router();
const posterController = require("../controllers/posterController");

router.post("/", posterController.upload, posterController.createPoster);
router.get("/", posterController.getPosters);
router.delete("/:id", posterController.deletePoster);

module.exports = router;
