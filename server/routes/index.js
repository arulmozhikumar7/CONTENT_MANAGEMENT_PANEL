const router = require("express").Router();

const posterRoute = require("./posterRoute");

router.use("/poster", posterRoute);

module.exports = router;
