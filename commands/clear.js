const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    if(!args[0]) return message.channel.send("вмысле");
    args[0]++;
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Удалено ${args[0]} сообщений.`).then(msg => msg.delete(5000));
    });
  }
  
  module.exports.help = {
    name: "clear"
  }