const Discord = require("discord.js");
const { inspect } = require("util");
const vm = require("vm");
const codeContext =  {};
vm.createContext(codeContext);
const client = new Discord.Client();
const prefix = "x!";
const rule = {own: "421373056158662656", admin: "421244086557605888"};
const creators = ['361951318929309707'];
const emojis = {nya:'371317556734197761'}
const colors = ['#ff0b0b', '#00e9ff', '#d600ff', '#ff4200', '#36ff00', '#f9ff00'];

client.on("ready", () => {
    console.log(`Успешный старт. ${client.guilds.size} серверов`);
    client.user.setActivity(`x!h for help ${client.guilds.size} servers`).catch(console.error);
    color();
});

async function color () {
    await colors.forEach(async function (item, number) {
        await setTimeout(async function () {client.guilds.get('434414839344136192').roles.get('435168022882287616').setColor(item).catch();if(number === colors.length-1) setTimeout(function () {color().catch(console.error)}, 500)}, number*500);
    });
}

client.on('message', async (message) => {

    if (message.content.startsWith("бот пиши")) {
        message.channel.startTyping();
    }

    if (message.content.startsWith("бот не пиши")) {
        message.channel.stopTyping();
    }
    
    if (message.content.startsWith("x!restart") && message.author.id === "361951318929309707") {
        process.exit();
    }
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (['eval', 'эмулировать'].includes(command) && message.author.id === "361951318929309707") {
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
                message.react("✅")
            } else {
                message.author.send(`${output}`, {split:"\n", code:"js"});
            }
        } catch (error) {
            message.channel.send(`Произошла ошибка \`\`\`js\n${error}\`\`\``);
            message.react("❎")
        }

        function clean(text)  {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }
    } else if (['nya'].includes(command)) {
                const emoj = client.emojis.get(emojis.nya); message.channel.send(`${emoj}`); message.delete();
    } else if (['poll'].includes(command)) {
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
    } else if (['avatar', 'av'].includes(command)) {
        let member = message.mentions.members.first();
        let embederr = (`${message.author}, пользователя нет на данном сервере.`);
        if (!member)
            return message.channel.send({embederr});
            const embed = new Discord.RichEmbed()
                .setTitle(`Аватар пользователя ${member.user.tag}`)
                .setImage(member.user.avatarURL)
                .setFooter("Avatar")
                .setColor("#0000ff")
            message.channel.send({embed});
    } else if (['embedsay'].includes(command)) {
        const embedsayMessage = args.join(" ");
        const embed = new Discord.RichEmbed()
        .setColor("#00ff00")
        .setDescription(embedsayMessage)
        message.channel.send({embed});
        message.delete().catch(O_o => {});
    } else if (['about'].includes(command)) {
        message.channel.send(`${client.guilds.size} серверов всего. \n${client.users.size} пользователей всего. \n${client.channels.size} каналов всего.`);
    } else if (['idea'].includes(command) && message.channel.guild.id === "419529589623357450") {
        const embed = new Discord
            .RichEmbed().setColor("0000ff")
            .setTitle('Ваши идеи')
            .setDescription(args.join(' '))
            .addField('Автор', message.author);
        let nick = message.author.username;
        if (message.member.nickname != null) nick = message.member.nickname;
        client.fetchWebhook('434303293427154956', 'DMd-wNbBAzAAcN4_mQ7H44ncvSH28RS6vkxdJ_XnR4ZMSBcf6slMxOWTr0zRPkrcKCQk').then(webhook => {
            webhook.send('', {username: nick, avatarURL: message.author.avatarURL, embeds: [embed]}).catch(console.error);
        }).catch(console.error);
        message.channel.send(`**Голосование пользователя ${message.author} успешно начато**`);
        message.delete();
    } else if (['vote'].includes(command) && message.channel.guild.id === "422775194281705493") {
        const embed = new Discord
            .RichEmbed().setColor("0000ff")
            .setDescription(args.join(' '))
            .addField('Автор', message.author);
        let nick = message.author.username;
        if (message.member.nickname != null) nick = message.member.nickname;
        client.fetchWebhook('432592245850374154', 'uC5qHLjDtA-AVW5PU4nCKtq4JMohqm855pdiQzo8i3b0c4Saraxv_Iz-I4I7A4fDr6In').then(webhook => {
            webhook.send('', {username: nick, avatarURL: message.author.avatarURL, embeds: [embed]}).catch(console.error);
        }).catch(console.error);
        message.channel.send(`**Голосование пользователя ${message.author} успешно начато**`);
        message.delete();
    } else if(['si', 'serverinfo'].includes(command)) {
        if (message.channel.guild.large == true) {
            large = "Да"
        }
        if (message.channel.guild.large == false) {
            large = "Нет"
        }
        if (message.channel.guild.region == "russia") {
            message.channel.guild.region = "Россия"
        }         

                const embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTitle('Информация об сервере', message.channel.guild.name)
                .setColor("ff0000")
                .setThumbnail(message.channel.guild.iconURL)
                .addField('>ID<', message.channel.guild.id)
                .addField('>Уровень верификации<', message.channel.guild.verificationLevel)
                .addField('>Количество пользователей<', message.channel.guild.memberCount)
                .addField('>Количество ролей<', message.channel.guild.roles.size)
                .addField('>Количество каналов<', message.channel.guild.channels.size)
                .addField('>Сервер большой?<', large)
                .addField('>Имя сервера<', message.channel.guild.name)
                .addField('>AFK канал<', message.channel.guild.afkChannel !== null ? message.channel.guild.afkChannel : 'Нету.')
                .addField('>Регион<', message.channel.guild.region)
                .setFooter('ServerInfo')
                .setTimestamp(); message.react("✅");
            message.channel.send({embed});
    } else if(['h', 'help'].includes(command)) {
        const embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('Команды бота.')
            .setColor("#42f4aa")
            .setThumbnail('https://cdn.pixabay.com/photo/2016/06/15/15/02/info-1459077_960_720.png')
            .setDescription("**x!eval** эмуляция js кода (Bot owner) \n**x!report** жалоба на пользователя. \n**x!say** сообщение от бота. \n**x!embedsay** embed сообщение от бота. \n**x!rs [ид канала] [сообщение]** отослать сообщение из 1 чата в другой. \n**x!us [ид пользователя] [сообщение]** отослать сообщение пользователю в лс от бота. (Bot owner) \n**x!invite** пригласить бота на сервер. \n**x!ping** проверка. \n**x!presence [тип] <статус>** изменить статус бота (Bot owner) \n**x!about** информация об количествах серверов, пользователей, каналов. \n**x!userinfo** информация об пользователе. \n**x!serverinfo** информация об сервере. \n**x!nya** тест команда эмодзи. \n**x!poll** создать голосование. \n**x!idea** идея по поводу сервера. (Quasar only) \n**x!vote** начать голосование (Galactic empire only) \n**x!avatar** просмотр аватара. \n**бот пиши** начну писать в чат где вы меня вызвали. \n**бот не пиши** перестану писать в чат где вы меня вызвали.")
            .setFooter("Создатель: X-49")
            .setTimestamp();
        message.channel.send({embed});
    } else if(['userinfo', 'ui'].includes(command)) {
                message.delete().catch(O_o => {});
        let member = message.guild.members.get(message.author.id);

        let username = message.author.username
        let avatar = message.author.avatarURL
        let verified = "Нет"
        let userStatus = "Оффлайн"
        let userID = message.author.id

        if (message.author.verified == true) {
            verified = "Да"
        }
        if (message.author.status == "online") {
            userStatus = "Онлайн"
        }
        
        
        let joinedDate = member.joinedAt;
        let joinedMonth = joinedDate.getMonth() + 1;

        let createdDate = message.author.createdAt;
        let createdMonth = createdDate.getMonth() + 1;

        const embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor("ff0000")
            .setTitle(username)
            .addField("ID пользователя:", message.author.id, false)
            .addField("Дискриминатор:", message.author.discriminator, false)
            .addField("Полный никнейм:", message.author.tag, false)
            .addField("Последнее сообщение:", message.author.lastMessage, false)
            .addField("ID Последнего сообщения:", message.author.lastMessageID, false)
            .addField("Создан:", (createdDate.getDate() < 10 ? '0' : '') + createdDate.getDate() + "." + (createdDate.getMonth() < 10 ? '0' : '') + createdMonth + "." + createdDate.getFullYear() + " " + (createdDate.getHours() < 10 ? '0' : '') + createdDate.getHours() + ":" + (createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes() + ":" + (createdDate.getSeconds() < 10 ? '0' : '') + createdDate.getSeconds(), false)
            .addField("Аккаунт верифицирован?", verified, false)
            .addField("Присоеднился к серверу:", (joinedDate.getDate() < 10 ? '0' : '') + joinedDate.getDate() + "." + (joinedDate.getMonth() < 10 ? '0' : '') + joinedMonth + "." + joinedDate.getFullYear() + " " + (joinedDate.getHours() < 10 ? '0' : '') + joinedDate.getHours() + ":" + (joinedDate.getMinutes() < 10 ? '0' : '') + joinedDate.getMinutes() + ":" + (joinedDate.getSeconds() < 10 ? '0' : '') + joinedDate.getSeconds(), false)
            .setThumbnail(avatar)
            .setFooter("Userinfo")
            .setTimestamp(); message.react("✅");
        message.channel.send({
            embed
        });
    } else if(['say'].includes(command)) {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);
    } else if (['us'].includes(command) && message.author.id === "361951318929309707") {
                if (message.guild.members.get === undefined) {
            return message.channel.send('Ошибка отправки сообщения');
        }
        let new_args = args;
        const userse = new_args.shift();
        const UsersayMessage = new_args.join(" ");
        console.log(userse);
               message.guild.members.get(userse).send(UsersayMessage);message.delete();
    } else if (['rs'].includes(command)) {
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
            .setFooter("Создатель: X-49")
            .setTimestamp(); message.react("✅");
        message.channel.send({embed});
    }else  if (['ping'].includes (command)) {
        message.channel.send("pong!");
        console.log("pong!"); message.react("✅");
    } else if(['test'].includes (command)) {
        message.channel.send('PEDO').then((msg) => {
setTimeout(function () {
msg.delete();
message.channel.send('RAS');
}, 2000);
})
    } else if(['presence'].includes(command) && message.author.id === "361951318929309707") {
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
    } else if(['beval'].includes(command) && message.author.id === "361951318929309707") {
        try {
            let evaled = vm.runInContext(args.join(" "), codeContext);
            message.channel.send(evaled, {code:"js",split:"\n"});
        } catch(e) {
            message.channel.send(e, {code:"js",split:"\n"});
        }
    }
});

client.login(process.env.TOKEN).catch(console.error);
