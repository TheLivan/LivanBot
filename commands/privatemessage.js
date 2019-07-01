const Discord = require('discord.js') // подключение discord.js к файлу

module.exports.run = async (bot, message, args) => {
    let messageArgs = args.slice(0)
    bot.guilds.find(x => x.id === process.env.MAIN_GUILD).members.find(x => x.id === args[0]).send(messageArgs.join(' '));
}

module.exports.help = {
    name: 'privatemessage' // название команды
}
