const Discord = require('discord.js') // подключение discord.js к файлу

module.exports.run = async (bot, message, args) => {
    const start = process.hrtime();
  return Promise.resolve('Pong!').then(() => {
    const diff = process.hrtime(start);
    message.channel.send(`Pong!\n${(diff[0] * 1000) + (diff[1] / 1000000)}s`)
  });
}

module.exports.help = {
    name: 'ping' // название команды
}