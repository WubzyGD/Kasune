const mongoose = require('mongoose');

const botDataSchema = new mongoose.Schema({
    finder: String,
    commands: Number,
    restarts: Number,
    lastRestart: Date,
    errors_all: Number,
    totalErrors: Number
});

module.exports = mongoose.model("bot", botDataSchema);