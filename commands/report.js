const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const bot = new Discord.Client()

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(args[0] == "help"){
      message.reply("Использование: !report <user> <причина>");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor('#ff6a00')
    .addField("Репорт кого", `${rUser} с ID: ${rUser.id}`)
    .addField("Репорт от", `${message.author} с ID: ${message.author.id}`)
    .addField("Канал", message.channel)
    .addField("Время", message.createdAt)
    .addField("Причина", rreason);

    let reportschannel = bot.channels.get('590535426482372646');
    //let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
    reportschannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"  
}