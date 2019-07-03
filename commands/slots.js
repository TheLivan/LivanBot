const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const { stripIndents } = require('common-tags');
const bot = new Discord.Client()
const tc = require("../utils/tempchannel.js");
const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];   

module.exports.run = async (bot, message, args) => {
	tc.noPerms(message, args, '1124')
	
    var slot1 = slots[Math.floor(Math.random() * slots.length)];
	var slot2 = slots[Math.floor(Math.random() * slots.length)];
	var slot3 = slots[Math.floor(Math.random() * slots.length)];
	
	if (slot1 === slot2 && slot1 === slot3) {
		message.channel.send(stripIndents`
		Слот: ${message.member}
        ${slot1} : ${slot2} : ${slot3}
        Поздравляем, ты выиграл!
		`); 
	} else {
		message.channel.send(stripIndents`
		Слот: ${message.member}
        ${slot1} : ${slot2} : ${slot3}
        Увы, но ты проиграл!
		`);	
	}

}

module.exports.help = {
  name: "slots"  
}