const Discord = require('discord.js') // подключение discord.js к файлу

module.exports.run = async (bot, message, args) => {

    message.guild.user.find("id", args[0]).send(args[1]);
}

module.exports.help = {
    name: 'privatemessage' // название команды
}