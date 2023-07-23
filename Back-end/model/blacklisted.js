const mongoose = require("mongoose");
const BlacklistSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
});
const BlacklistModel = mongoose.model("Blacklist", BlacklistSchema);
module.exports = { BlacklistModel };