let channels_id = [];

module.exports.noPerms = (oldMember, newMember, eventName) => {
    var guild = newMember.guild;
    var member = newMember;
    guild.createChannel(member.user.username+' +', 'voice').then( // Create the actual voice channel.
        (chan) => {
            chan.setParent("587243104625491969").then( // Move the voice channel to the current message's parent category.
                (chan2) => {

                    channels_id.push(chan2.id);
                    member.setVoiceChannel(chan2.id)
                    //console.log(`Set the category of ${chan2.name} to ${chan2.parent.name}`);
                    chan2.overwritePermissions(newMember.guild.roles.find(x => x.name === '@everyone'), {
                        CONNECT: false,
                        SPEAK: false,
                        MANAGE_ROLES: false,
                        MANAGE_CHANNELS: false,
                        USE_VAD: false
                    });
                    chan2.overwritePermissions(member, {
                        CONNECT: true,
                        SPEAK: true,
                        MANAGE_ROLES: true,
                        MANAGE_CHANNELS: true,
                        USE_VAD: true
                    });
                }
            ).catch(console.error);
        }
    ).catch(console.error);
    return channels_id;
}

module.exports.delchannels = (oldMember, newMember) => {
    for (let i in channels_id) {
        console.log(channels_id)
        let channelId = channels_id[i];
        let voice_channel = oldMember.voiceChannel ? oldMember.voiceChannel.guild.channels.find(x => x.id === channelId) : newMember.voiceChannel.guild.channels.find(x => x.id === channelId);
        if (IsInVoice(oldMember, channelId) && !IsInVoice(newMember, channelId) && voice_channel.members.size < 1) {
            voice_channel.delete()
            channels_id.splice(channels_id.indexOf(i), 1);
        };
    };
}

function IsInVoice(member, id) {
    return member.voiceChannel ? member.voiceChannel.id == id : false
};
