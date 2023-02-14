require("dotenv").config();

exports.PORT = process.env.PORT || 5000;
exports.CLIENT_URL = process.env.CLIENT_URL || "https://localhost:3000";
exports.SERVER_URL = process.env.SERVER_URL || "https://localhost:5000";
