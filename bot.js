const Discord = require('discord.js')
const fs = require('fs')
const bot = new Discord.Client()
bot.commands = new Discord.Collection() 
const config = require('./config.json')
var redis = require('redis');
var redisclient = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

fs.readdir('./commands', (err, files) => { // чтение файлов в папке commands
    if (err) console.log(err)   

    let jsfile = files.filter(f => f.split('.').pop() === 'js') // файлы не имеющие расширение .js игнорируются
    if (jsfile.length <= 0) return console.log('Команды не найдены!') // если нет ни одного файла с расширением .js

    console.log(`Loaded ${jsfile.length} commands`)
    jsfile.forEach((f, i) => { // добавляем каждый файл в коллекцию команд
        let props = require(`./commands/${f}`)
        bot.commands.set(props.help.name, props)
        console.log(`${f} loaded!`);
    })
})

bot.on('message', async message => {
    let prefix = process.env.PREFIX
    let messageArray = message.content.split(' ') // разделение пробелами
    let command = messageArray[0] // команда после префикса
    let args = messageArray.slice(1) // аргументы после команды

    let command_file = bot.commands.get(command.slice(prefix.length)) // получение команды из коллекции
    if (command_file) command_file.run(bot, message, args)

    if(message.author.bot) return;

    let xpAdd = Math.floor(Math.random() * 7) + 8;
	if(message.member.roles.some(r=>["Бандит"].includes(r.name))){
		redisclient.get('banditpoints', function (err, reply) {
			console.log("На данный момент у бандитов " + Number(reply));
			redisclient.set('banditpoints', String(Number(reply) + Number(xpAdd)));
		});
	}
		
	if(message.member.roles.some(r=>["Сталкер"].includes(r.name))){
		redisclient.get('stalkerpoints', function (err, reply) {
			console.log("На данный момент у сталкеров " + Number(reply));
			redisclient.set('stalkerpoints', String(Number(reply) + Number(xpAdd)));
		});
	}
	
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
    bot.user.setPresence({status: 'dnd', game:{name: 'подписывайтесь на уведомитель', type: 0}})

    var interval = setInterval (function () {
		client.channels.get('587243104625491970').send('ban huan');
	}, 1 * 900000); 
})

bot.login(process.env.BOT_TOKEN)