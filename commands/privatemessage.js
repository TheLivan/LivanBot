const Discord = require('discord.js') // подключение discord.js к файлу

module.exports.run = async (bot, message, args) => {

    bot.guilds.get(x => x.id === process.env.MAIN_GUILD).first.members.find(x => x.id === args[0]).send(args[1]);
}

module.exports.help = {
    name: 'privatemessage' // название команды
}
