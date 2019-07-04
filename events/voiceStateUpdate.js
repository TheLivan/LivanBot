module.exports = (oldMember, newMember) => {
    console.log('state 1')
    if (IsInVoice(newMember, '596262146271084544') || IsInVoice(oldMember, '596262146271084544')) {
        console.log('state 2')
        require("../utils/privatechannels.js").createPrivate(oldMember, newMember)
    };
    require("../utils/privatechannels.js").delchannels(oldMember, newMember)
};

function IsInVoice(member, id) {
    return member.voiceChannel ? member.voiceChannel.id == id : false
};