const Discord = require("discord.js");
const fs = require("fs");
//let config = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Ошибка")
        .setColor('#b70000')
        .addField("Нет разрещения", perm);

    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
       // .setColor(config.red)
        .setTitle("Ошибка")
        .addField(`${user} has perms`, perms);

    message.channel.send(embed).then(m => m.delete(10000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Ошибка")
        .setDescription("You cannot ban a bot.")
        //.setColor(config.red);

    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Ошибка")
        .setDescription("Could not find that user.")
        //.setColor(config.red);

    channel.send(embed).then(m => m.delete(10000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Ошибка")
        .setDescription("Не указана причина")
        //.setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}