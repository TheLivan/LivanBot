let channels_id = [];

module.exports.noPerms = (message, args, eventName) => {

    var guild = message.guild;
    var member = message.member;
    guild.createChannel(eventName, 'voice').then( // Create the actual voice channel.
        (chan) => {
            chan.setParent("587243104625491969").then( // Move the voice channel to the current message's parent category.
                (chan2) => {
                    console.log("stage 3");
                    channels_id.push(chan2.id);
                    console.log(channels_id)
                    console.log(chan2);
                    //console.log(`Set the category of ${chan2.name} to ${chan2.parent.name}`);
                    chan2.overwritePermissions(message.guild.roles.find(x => x.name === channelId), {
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
    return channels_id;
}

module.exports.delchannels = (oldMember, newMember) => {
    for (let i in channels_id){
        console.log(channels_id)
        let channelId = channels_id[i];
        let voice_channel = oldMember.voiceChannel ? oldMember.voiceChannel.guild.channels.find(x => x.id === channelId) : newMember.voiceChannel.guild.channels.find(x => x.id === channelId);
        if (IsInVoice(oldMember, channelId) && !IsInVoice(newMember, channelId) && voice_channel.members.size < 1){
            console.log('truee')
            voice_channel.delete()
        };
    };
}

function IsInVoice(member, name){
    return member.voiceChannel ? member.voiceChannel.id == id : false
};
