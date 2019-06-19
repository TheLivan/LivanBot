module.exports.run = async (bot, message, args) => {
    var eventName = 'ban';
    var server = message.guild;
    var permsName = eventName+"-"+message.author.username;
    message.guild.createRole({
        //data: {
            name: permsName,
            permissions: []
        //},
        //reason: 'new Event'
    }).then(role => { 
        message.member.addRole(role,permsName)
        .catch(error => client.catch(error))
    }).catch(error => client.catch(error))
    server.createChannel(eventName, 'voice').then( // Create the actual voice channel.
        (chan) => {
            chan.setParent("584711823903948803").then( // Move the voice channel to the current message's parent category.
                (chan2) => {
                    console.log("stage 3");
                    console.log(chan2);
                    //console.log(`Set the category of ${chan2.name} to ${chan2.parent.name}`);
                    chan2.overwritePermissions(message.guild.roles.find('name', '@everyone'), { // Disallow Everyone to see, join, invite, or speak
                      'CREATE_INSTANT_INVITE' : false,        'VIEW_CHANNEL': false,
                      'CONNECT': false,                       'SPEAK': false
                   });
                   chan2.overwritePermissions(message.guild.roles.find('name', permsName),   {//Explicitely allow the role to see, join and speak
                       'VIEW_CHANNEL': true,                   'CONNECT': true,            'SPEAK': true,
                   });
                      console.log("stage 4");
                }
            ).catch(console.error);
        }
    ).catch(console.error);
    return '```Added```';
}

module.exports.help = {
    name: 'privatechannel' // название команды
}