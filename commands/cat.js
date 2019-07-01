const Discord = require("discord.js");
const { get } = require("snekfetch"); 

module.exports.run = async (bot, message, args) => {
    try {
        get('https://aws.random.cat/meow').then(res => {
            const embed = new Discord.RichEmbed()
            .setImage(res.body.file)
            .setColor('#DA8A10')
            return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send('Ниработает');
    }
}
  
module.exports.help = {
  name: "cat"
}   