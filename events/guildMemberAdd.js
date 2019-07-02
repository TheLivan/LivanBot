const Discord = require('discord.js')

module.exports = (guild, member) => {
    console.log(member.user.username + " joined " + guild.name);
    const embed = new Discord.RichEmbed()
    .setTitle('Новый человек!')
    .setDescription(member.name + ' присоединился к нам!')
    .addField('Если нужен экскурс по серверу, то обрати внимание на #❗информация ', 'Приятного общения!', true)
    bot.channels.get('587243104625491970').send(embed);
}