exports.create = async function (message) {
    let guild = message.guild;
    let everyone = guild.roles.find(role=>role.name === "@everyone");
    let parent = guild.channels.find(channel=>channel.name === "Private Channels");
    
    if(parent == null){await createParent(guild).then(function(result){parent=result})}
    let papa = guild.channels.get(parent.id).children.array();
    if(papa){
        for(i=0;i<papa.length;i++){
            if(papa[i].name==message.author.id+' Private Channel'){
                message.reply("You can only have 1 private channel at the time");
                return;
            }
        }
    }
    guild.createChannel(message.author.id+' Private Channel', {
        type: 'voice',
        parent:parent.id,
        permissionOverwrites: [{
            id: message.author.id,
            allow:["CONNECT"]
        },
        {
            id: everyone,
            deny: ["CONNECT"]
        }]
    }).then(function(m){
            message.reply("Your private channel is ready.")
            runTimer();
            function runTimer() {
                setTimeout(function () {
                    //delete if possible
                    if(m.deleteable)m.delete();
                    let rmvchannel =guild.channels.find(channel=>channel.name===message.author.id+' Private Channel');
                    if(rmvchannel){
                        //remove channel if nobody joined after 10 seconds
                        if(rmvchannel.members.array().length==0)rmvchannel.delete();
                    }
                    
                }, 10000);
            }
        })
        .catch(console.error);

}