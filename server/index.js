const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const path = require("path");
dotenv.config();

app.use(cors());
app.use(express.json());
connectDb();
const routes = require("./routes");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("CONTENT MANAGEMENT SERVER");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
