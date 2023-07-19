const mongoose = require("mongoose");

let connection = mongoose.connect(process.env.MONGODB_URL);

module.exports = { connection };
