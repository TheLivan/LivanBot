const Discord = require("discord.js");
const fs = require("fs");
var redis = require('redis');
var redisclient = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

module.exports.xpAdd = (message) => {

    let xpAdd = Math.floor(Math.random() * 7) + 8;
    if(message.channel != bot.channels.get('475350792426094607')){
        if(message.member.roles.some(r=>["Бандит"].includes(r.name))){
            redisclient.get('banditpoints', function (err, reply) {
                console.log("На данный момент у бандитов " + Number(reply));
                redisclient.set('banditpoints', String(Number(reply) + Number(xpAdd)));
            });
        }
        
        if(message.member.roles.some(r=>["Сталкер"].includes(r.name))){
            redisclient.get('stalkerpoints', function (err, reply) {
                console.log("На данный момент у сталкеров " + Number(reply));
                redisclient.set('stalkerpoints', String(Number(reply) + Number(xpAdd)));
            });
        }
    }
}

module.exports.setXpChannel = () => {
    redisclient.get('stalkerpoints', function (err, stalkerpoints) {
        redisclient.get('banditpoints', function (err, banditpoints) {
            client.channels.get('588038742669918274').edit({ name: 'STAL: ' + stalkerpoints + ' ' + 'BAND: ' + banditpoints})
    });
});
}