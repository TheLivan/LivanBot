    module.exports = (client, msg) => {

    if (msg.author.bot) return;

    if (msg.content.includes('discord.gg/'||'discordapp.com/invite/')) {
        if (msg.member.hasPermission('ADMINISTRATOR')) return;
        msg.delete() //delete the message
        msg.channel.send("<@" + msg.author.id + "> , Пожалуйста не рекламируйте сервер!").then(msg => {msg.delete(120000)})
    }

    if (!msg.content.toLowerCase().startsWith('t!')) return;

    const args = msg.content.toLowerCase().slice(2).trim().split(/ +/g);
  
    const cmd = client.commands.get(args[0]);
    if (!cmd) return;
  
    cmd.run(client, msg, args);

};