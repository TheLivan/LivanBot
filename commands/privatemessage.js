const Discord = require('discord.js') // подключение discord.js к файлу

module.exports.run = async (bot, message, args) => {

    bot.guilds.first.members.find(x => x.id === args[0]).send(args[1]);
}

module.exports.help = {
    name: 'privatemessage' // название команды
}
