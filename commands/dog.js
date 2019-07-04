    
const Discord = require("discord.js");
const { get } = require("snekfetch"); 
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    try {
        get('https://dog.ceo/api/breeds/image/random').then(res => {
            const embed = new Discord.RichEmbed()
            .setImage(res.body.message)
            return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send('Ниработает');
    }
}
  
module.exports.help = {
  name: "dog"
}