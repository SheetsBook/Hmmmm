const Discord = require("discord.js");
const { inspect } = require("util");
const vm = require("vm");
const codeContext =  {};
vm.createContext(codeContext);
const client = new Discord.Client();
const prefix = "x!";
const rule = {own: "421373056158662656", admin: "421244086557605888"};
const creators = ['207821802431315968'];
const emojis = {mila:'418748638081318912'};
const colors = ['ff2828','ff3d28','ff4b28','ff5a28','ff6828','ff7628','ff8c28','ffa128','ffac28','ffb728','ffc228','ffd028','ffd728','ffe228','fff028','fffb28','edff28','deff28','d0ff28','c2ff28','b3ff28','9aff28','8cff28','7dff28','6fff28','5aff28','3dff28','28ff2b','28ff41','28ff56','28ff6c','28ff81','28ff93','28ffa9','28ffba','28ffc9','28ffde','28fff4','28ffff','28f0ff','28deff','28deff','28d3ff','28c5ff','28baff','28b0ff','28a5ff','289eff','2893ff','2885ff','2876ff','2864ff','2856ff','284bff','2841ff','2836ff','2828ff','3228ff','4428ff','5328ff','6828ff','7628ff','7e28ff','8828ff','9328ff','a128ff','b028ff','be28ff','c928ff','d328ff','db28ff','e528ff','f028ff','ff28ff','ff28f7','ff28e5','ff28de','ff28d0','ff28c9','ff28ba','ff28b3','ff28a5','ff289a','ff288c','ff2881','ff287a','ff2873','ff2868','ff2861','ff2856','ff284f','ff2848','ff2844','ff282b'];

client.on("ready", () => {
    console.log(`Запускай шарманку блять (с) стрын ${client.guilds.size} cervakov`);
    client.user.setActivity(`x!h for help ${client.guilds.size} servers`).catch(console.error);
});

client.on('message', async (message) => {

    if (message.content.startsWith("бот пиши")) {
        message.channel.startTyping();
    }

    if (message.content.startsWith("бот не пиши")) {
        message.channel.stopTyping();
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (['eval', 'эмулировать'].includes(command) && message.author.id === "207821802431315968") {
        const code = args.join(" ");
        const token = client.token.split("").join("[^]{0,2}");
        const rev = client.token.split("").reverse().join("[^]{0,2}");
        const filter = new RegExp(`${token}|${rev}`, "g");
        try {
            let output = eval(code);
            if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
            output = inspect(output, { depth: 0, maxArrayLength: null });
            output = output.replace(filter, "[TOKEN]");
            output = clean(output);
            if (output.length < 1950) {
                message.author.send(`\`\`\`js\n${output}\n\`\`\``);
            } else {
                message.author.send(`${output}`, {split:"\n", code:"js"});
            }
        } catch (error) {
            message.channel.send(`Произошла ошибка \`\`\`js\n${error}\`\`\``);
        }

        function clean(text)  {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }
    } else if (['vote'].includes(command) && message.author.id === "207821802431315968") {
                message.delete().catch(O_o => {});
        const say_vote_embed = args.join(" ");
        const embed = new Discord.RichEmbed()
            .setColor(16766720)
            .setDescription(say_vote_embed)
            .setFooter("голосование.")
            .setTimestamp();
        message.channel.send({
            embed
        }).then(function(message) {
            message.react("✅")
            message.react("❎")
        }).catch(function() {});
    } else if (['about'].includes(command)) {
        message.channel.send(`${client.guilds.size} серверов всего. \n${client.users.size} пользователей всего. \n${client.channels.size} каналов всего.`);
    } else if (['20197u2'].includes(command)) {
        const embed = new Discord
            .RichEmbed().setColor("ff0000")
            .setDescription(args.join(' '))
            .addField('Жалоба пользователя', message.author);
        let nick = message.author.username;
        if (message.member.nickname != null) nick = message.member.nickname;
        client.fetchWebhook('427002003005243393', 'SvggGN-ntZGC_2T-0eJSTCUIk2tcKrCwhZ6l-xq44e8wfdM6uctYfYw4Nc9cxNy7Alcf').then(webhook => {
            webhook.send('', {username: nick, avatarURL: message.author.avatarURL, embeds: [embed]}).catch(console.error);
        }).catch(console.error);
        message.channel.send(`**Репорт пользователя ${message.author} успешно принят**`);
        message.delete();
    } else if(['h', 'help'].includes(command)) {
        const embed = new Discord.RichEmbed()
            .setTitle('Команды бота.')
            .setColor("#42f4aa")
            .setThumbnail('https://cdn.pixabay.com/photo/2016/06/15/15/02/info-1459077_960_720.png')
            .setDescription("**x!eval** эмуляция js кода (bot owner) \n**x!report** жалоба на пользователя. \n**x!say** сообщение от бота. \n**бот пиши** начну писать в чат где вы меня вызвали. \n**бот не пиши** перестану писать в чат где вы меня вызвали. \n**x!invite** пригласить бота на сервер. \n**x!ping** проверка. \n**x!presence** изменить статус бота (owner) \n**x!about** информация об количествах серверов, пользователей, каналов.")
            .addField('Eval', 'Позволяет владельцу бота запускать произвольный код из аккаунта бота. \nПредупреждение: Эта команда может быть чрезвычайно опасной. \nЕсли вы не знаете, что она делает, вы можете вызвать ужасные последствия | проблемы на вашем сервере или с этим ботом. \nНИКОГДА не запускайте эту команду, если вы не полностью уверены в том, за что отвечает эта команда.')
            .addField('report', '**Отключено.**')
            .addField('say', 'Команда доступная для всех, позволяет писать от имени бота')
            .setFooter("Создатель:X-49")
            .setTimestamp();
        message.channel.send({embed});
    } else if(['say'].includes(command)) {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);
    } else if (['rs'].includes (command)) {
        if (message.channel.id === undefined) {
            return message.channel.send('Ошибка отправки сообщения');
        }
        let new_args = args;
        const chat = new_args.shift();
        const sayMessage = new_args.join(" ");
        console.log(chat);
        message.guild.channels.get(chat).send(sayMessage).catch(()=>{message.reply('ты ебобо?');});
        message.delete().catch(O_o=>{});
    } else if(['invite'].includes(command)) {
        const embed = new Discord.RichEmbed()
            .setTitle('Приглашение бота на ваш сервер.')
            .setColor("#0000ff")
            .setDescription("Ссылка на бота https://discordapp.com/oauth2/authorize?&client_id=426728342859808768&scope=bot&permissions=8 \nЕсли вы не желаете давать боту права `SERVER_MANAGE` то перейдите по данной ссылке: \nhttps://discordapp.com/oauth2/authorize?&client_id=426728342859808768&scope=bot&permissions=0")
            .setFooter("Создатель:X-49")
            .setTimestamp();
        message.channel.send({embed});
    }else  if (['ping'].includes (command)) {
        message.channel.send("pong!");
        console.log("pong!");
    } else if(['test'].includes (command)) {
        message.member.kick('сам попросил').catch(console.error);
    } else if(['presence'].includes(command) && message.author.id === "207821802431315968") {
        let new_args = args;
        if (new_args[0].toLowerCase() === 'играет' && new_args[1].toLowerCase() === 'в') {
            new_args[0] = 'играет в';
            new_args.splice(1, 1);
        }
        let type = new_args.shift();
        let real_type;
        if (['играет в', 'играет', 'play', 'playing', '0'].includes(type.toLowerCase()))
            real_type = 0;
        else if (['слушает', 'hear', 'hearing', '2'].includes(type.toLowerCase()))
            real_type = 2;
        else if (['смотрит', 'watch', 'watching', '3'].includes(type.toLowerCase()))
            real_type = 3;
        else return message.channel.send(`Ошибка. Тип \`${type.replace(/` /g, "\'")}\` не существует`);
        const status = new_args.join(" ");
        client.user.setPresence({ game: { name: status, type: real_type } }).catch();
        let status_word;
        if (real_type === 0)
            status_word = 'Играет в';
        else if (real_type === 2)
            status_word = 'Слушает';
        else if (real_type === 3)
            status_word = 'Смотрит';

        const embed = new Discord.RichEmbed()
            .setTitle('Статус изменен на:')
            .setDescription(`${status_word} **${status.replace(/` /g, "\\\'")}**`)
            .setFooter('Presence');
        message.channel.send({embed});
        message.delete();
    } else if(['beval'].includes(command) && message.author.id === "207821802431315968") {
        try {
            let evaled = vm.runInContext(args.join(" "), codeContext);
            message.channel.send(evaled, {code:"js",split:"\n"});
        } catch(e) {
            message.channel.send(e, {code:"js",split:"\n"});
        }
    }
});

client.login(process.env.TOKEN).catch(console.error);
