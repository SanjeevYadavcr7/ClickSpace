const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const colors = require("colors");
const mongoose = require("mongoose");
// const passport = require('passport');
const { MONGO_URI, CLIENT_URL, PORT } = require("./config.keys");
const { default: helmet } = require("helmet");

const authRoutes = require("./routes/auth");
const httpstatusCodes = require("./util/status-codes");

/**
 * Initializing  Express Server
 */
const app = express();

/**
 * MongoDb Connection
 */
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
  console.log(
    colors.red(
      "%s MongoDB connection error. Please make sure MongoDB is running."
    )
  );
  process.exit();
});
db.once("open", () => {
  console.log(colors.green("DB Connected successfully!!!!!!!"));
});

/**
 * CORS middleaware to allow client connection
 */
app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET, PUT, POST, DELETE, PATCH",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(logger("dev", { stream: accessLogStream }));
app.use(helmet());

app.use("/auth", authRoutes);

/**
 * Error middleware to handle errors
 */
app.use((error, req, res, next) => {
  console.log(colors.rainbow("Error Occurred"));
  const status = error.statusCode || httpstatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

app.listen(PORT, () => {
  console.log(colors.blue(`server running at http://localhost:${PORT}`));
});
