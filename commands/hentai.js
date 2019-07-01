const Discord = require("discord.js");
const { get } = require("snekfetch"); 

module.exports.run = async (bot, message, args) => {
    try {
        get('https://nekos.life/api/v2/img/hentai').then(res => {
            const embed = new Discord.RichEmbed()
            .setImage(res.body.url)
            .setColor('#78DA21')
            return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send('Ниработает');
    }
}
  
module.exports.help = {
  name: "hentai"
}   