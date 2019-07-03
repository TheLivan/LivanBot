module.exports.noPerms = (message, args, eventName) => {

    var guild = message.guild;
    var member = message.member;
    guild.createChannel(eventName, 'voice').then( // Create the actual voice channel.
        (chan) => {
            chan.setParent("427382662240534535").then( // Move the voice channel to the current message's parent category.
                (chan2) => {
                    console.log("stage 3");
                    console.log(chan2);
                    //console.log(`Set the category of ${chan2.name} to ${chan2.parent.name}`);
                    chan2.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
                        CONNECT: false,
                        SPEAK: false,
                        USE_VAD: false
                    });
                    chan2.overwritePermissions(member, {
                        CONNECT: true,
                        SPEAK: true,
                        USE_VAD: true
                    });
                    console.log("stage 4");
                }
            ).catch(console.error);
        }
    ).catch(console.error);
    return '```Added```';
}