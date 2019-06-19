function addChannel(message,args,eventName){
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
                    chan2.overwritePermissions(message.guild.roles.find('name', '@everyone'), { 'CREATE_INSTANT_INVITE' : false }); // Give the channel some standard permissions.
                    chan2.overwritePermissions(message.guild.roles.find('name', permsName), {
                        'CREATE_INSTANT_INVITE' : false,        'ADD_REACTIONS': true,
                        'READ_MESSAGES': true,                  'SEND_MESSAGES': true,
                        'SEND_TTS_MESSAGES': true,              'MANAGE_MESSAGES': true,
                        'EMBED_LINKS': true,                    'ATTACH_FILES': true,
                        'READ_MESSAGE_HISTORY': true,           'MENTION_EVERYONE': true,
                        'EXTERNAL_EMOJIS': true,                'CONNECT': true,
                        'SPEAK': true
                      });
                      console.log("stage 4");
                }
            ).catch(console.error);
        }
    ).catch(console.error);
    return '```Added```';
}