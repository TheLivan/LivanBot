module.exports = (oldMember, newMember) => {
    if (IsInVoice(newMember, '596262146271084544')) {
        require("../utils/privatechannels.js").createPrivate(oldMember, newMember)
    };
    
    require("../utils/privatechannels.js").delchannels(oldMember, newMember)
};

function IsInVoice(member, id) {
    return member.voiceChannel ? member.voiceChannel.id == id : false
};