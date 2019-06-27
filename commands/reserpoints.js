const Discord = require("discord.js");
const errors = require("../utils/private.js");

module.exports.run = async (bot, message, args) => {
  require("../bot.js").createVoice(message);
}

module.exports.help = {
  name: "reserpoints"  
}