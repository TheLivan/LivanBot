console.log('Инициализация ядра...\nПодключение библиотек...');
const Discord = require('discord.js')
fs = require('fs'),
bot = new Discord.Client();
xpclan = require("./utils/xpclan.js");
bot.commands = new Discord.Collection() 
console.log(`Библиотеки подключены!\n`);

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

bot.on('voiceStateUpdate', (oldMember, newMember) =>{
    
    if (IsInVoice(newMember, '596262146271084544')) require("./utils/privatechannels.js").createPrivate(oldMember, newMember);
    
    require("./utils/privatechannels.js").delchannels(oldMember, newMember)
});
  
bot.on('message', async message => {
    if(message.author.bot) return;
    
    if(message.channel.type === "dm") bot.channels.get('591298792410579034').send(message.author + ": " + message);
    
    let prefix = process.env.PREFIX
    let messageArray = message.content.split(' ') // разделение пробелами
    let command = messageArray[0] // команда после префикса
    let args = messageArray.slice(1) // аргументы после команды
    if(command.slice(0, prefix.length) == prefix){
        let command_file = bot.commands.get(command.slice(prefix.length)) // получение команды из коллекции
        if (command_file) command_file.run(bot, message, args)
    }
 
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
    console.log(`${bot.user.tag} is online on ${bot.guilds.size} servers!`);
    bot.user.setPresence({status: 'dnd', game:{name: 'подписывайтесь на уведомитель', type: 0}})

    var interval = setInterval (function () {
		bot.channels.get('587243104625491970').send('ban huan');
	}, 1 * 900000); 
})

function IsInVoice(member, id) {
    return member.voiceChannel ? member.voiceChannel.id == id : false
};

bot.login(process.env.BOT_TOKEN)