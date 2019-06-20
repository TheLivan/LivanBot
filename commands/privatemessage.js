const Discord = require('discord.js') // подключение discord.js к файлу

module.exports.run = async (bot, message, args) => {

    bot.guilds.find(x => x.id === "475350792426094603").members.find(x => x.name === args[0]).send(args[1]);
}

module.exports.help = {
    name: 'privatemessage' // название команды
}