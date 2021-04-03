const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    gid: {type: String, unique: true},
    staffrole: {type: String, default: ''},
    wch: {type: String, default: ''},
    lch: {type: String, default: ''},
    logch: {type: String, default: ''},
    welcomerole: {type: String, default: ''},
    joinrole: {type: String, default: ''},
    cooldowns: {type: Boolean, default: false},
    prefix: {type: String, default: ''},
    nostatus: {type: Boolean, default: false},
    starchannel: {type: String, default: ''},
    starreq: {type: Number, default: 5},
    starsenabled: {type: Boolean, default: false},
});

module.exports = mongoose.model("guild", guildSchema);