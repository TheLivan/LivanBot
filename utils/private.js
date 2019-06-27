function createVoice(message) {
    let mentions = message.mentions ? message.mentions.members.map(member => member.id) : [message.member.id];

    if (!mentions.includes(message.member.id)) {
        mentions.push(message.member.id);
    };

    let current_code = randomstring.generate();
    let guild = message.guild;
    if (!guild.me.permissions.has('MANAGE_CHANNELS')) {
        message.reply("I do not have permissions to complete this action!");
        return;
    };
    guild.createChannel(current_code, 'voice', [{ 'id': guild.id, 'deny': 36700160, 'allow': 1024 }])
        .then(channel => {
            current_channels.push(current_code);
            for (let i in mentions) {
                let member = guild.members.get(mentions[i]);
                channel.overwritePermissions(member, {
                    CONNECT: true,
                    SPEAK: true,
                    USE_VAD: true
                });
            };
        }).catch(err => {
            console.error(err);
        });
};