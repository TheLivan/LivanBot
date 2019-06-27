const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    
  require("../utils/private.js").create(message,bot);  

}

module.exports.help = {
  name: "reserpoints"  
}