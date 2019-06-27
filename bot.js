console.log('Инициализация ядра...\nПодключение библиотек...');
const Discord = require('discord.js')
fs = require('fs'),
    bot = new Discord.Client();
xpclan = require("./utils/xpclan.js");
bot.commands = new Discord.Collection()
console.log(`Библиотеки подключены!\n`)
var current_channels    = []

fs.readdir('./commands', (err, files) => { // чтение файлов в папке commands
    if (err) console.log(err)
    let counter = files.length;
    let counteris = 0;
    let jsfile = files.filter(f => f.split('.').pop() === 'js') // файлы не имеющие расширение .js игнорируются
    if (jsfile.length <= 0) return console.log('Команды не найдены!') // если нет ни одного файла с расширением .js

    console.log(`Найдено ${jsfile.length} комманд`)
    jsfile.forEach((f, i) => { // добавляем каждый файл в коллекцию команд
        counteris++;
        let props = require(`./commands/${f}`)
        bot.commands.set(props.help.name, props)
        console.log(`${f} загружен!`);
    });
    if (counter == counteris) console.log('Все комманды загружены!\n');
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    let counter = files.length;
    let counteris = 0;
    files.forEach(file => {
        counteris++;
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
        delete require.cache[require.resolve(`./events/${file}`)];
        console.log(`${file} загружен!`);
    });
    if (counter == counteris) console.log('Все ивенты загружены!\n');
});

bot.on('message', async message => {
    if (message.author.bot) return;

    if (message.channel.type === "dm") bot.channels.get('591298792410579034').send(message.author + ": " + message);;
    //console.log(message);

    let prefix = process.env.PREFIX
    let messageArray = message.content.split(' ') // разделение пробелами
    let command = messageArray[0] // команда после префикса
    let args = messageArray.slice(1) // аргументы после команды

    let command_file = bot.commands.get(command.slice(prefix.length)) // получение команды из коллекции
    if (command_file) command_file.run(bot, message, args)

    xpclan.xpAdd(message, bot);
    xpclan.setXpChannel(bot);
})

bot.on('ready', () => {
    console.log(`
Campy the Livan Bot
   T
 .-"-.
|  ___|
| (.\\/.)
|  ,,,'
| '###
'----`)
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setPresence({ status: 'dnd', game: { name: 'подписывайтесь на уведомитель', type: 0 } })

    var interval = setInterval(function () {
        bot.channels.get('587243104625491970').send('ban huan');
    }, 1 * 900000);
})

bot.on('voiceStateUpdate', (oldMember, newMember) =>{
    for (let i in current_channels){
        let channelName = current_channels[i];
        let voice_channel = oldMember.voiceChannel ? oldMember.voiceChannel.guild.channels.find("name", channelName) : newMember.voiceChannel.guild.channels.find("name", channelName);
        if (IsInVoice(oldMember, channelName) && !IsInVoice(newMember, channelName) && voice_channel.members.size < 1){
            voice_channel.delete()
        };
    };
});

function IsInVoice(member, name){
    return member.voiceChannel ? member.voiceChannel.name == name : false
};

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

bot.login(process.env.BOT_TOKEN)