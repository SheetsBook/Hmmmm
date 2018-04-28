const Discord = require("discord.js");
//Библеотека discord.js
const { inspect } = require("util");
//фор евал
const vm = require("vm");
const codeContext =  {};
vm.createContext(codeContext);
//Клиент бота
const client = new Discord.Client();
//префикс
const prefix = "x!";
//массив ролей sss тест
const rule = {own: "421373056158662656", admin: "421244086557605888"};
//массив сосздателей
const creators = ['361951318929309707'];
//массив эмодзи
const emojis = {nya:'435849475865575424'}
//массив цветов
const colors = ['ff2828','ff3d28','ff4b28','ff5a28','ff6828','ff7628','ff8c28','ffa128','ffac28','ffb728','ffc228','ffd028','ffd728','ffe228','fff028','fffb28','edff28','deff28','d0ff28','c2ff28','b3ff28','9aff28','8cff28','7dff28','6fff28','5aff28','3dff28','28ff2b','28ff41','28ff56','28ff6c','28ff81','28ff93','28ffa9','28ffba','28ffc9','28ffde','28fff4','28ffff','28f0ff','28deff','28deff','28d3ff','28c5ff','28baff','28b0ff','28a5ff','289eff','2893ff','2885ff','2876ff','2864ff','2856ff','284bff','2841ff','2836ff','2828ff','3228ff','4428ff','5328ff','6828ff','7628ff','7e28ff','8828ff','9328ff','a128ff','b028ff','be28ff','c928ff','d328ff','db28ff','e528ff','f028ff','ff28ff','ff28f7','ff28e5','ff28de','ff28d0','ff28c9','ff28ba','ff28b3','ff28a5','ff289a','ff288c','ff2881','ff287a','ff2873','ff2868','ff2861','ff2856','ff284f','ff2848','ff2844','ff282b'];
//Выполняет действие когда бот запустился.
client.on("ready", () => {
    //Отпраляет сообщение в логи что бот запущен (+ количество серверов).
    console.log(`Успешный старт. ${client.guilds.size} серверов`);
    //Ставит боту статус.
    client.user.setActivity(`x!h for help ${client.guilds.size} servers`).catch(console.error);
    //Функция необходимая для запуска радуги.
    color();
});

const servers = [['419529589623357450', '427214745083576320'], ['389335832693309441', '435077516257132546']];

async function color () {
    await servers.forEach(async function (item1, number1) {
        await colors.forEach(async function (item, number) {
            //Ищет заданую гильдию после заданую роль, в заданой скорости вращает цвета по кругу.
            await setTimeout(async function () {client.guilds.get(item1[0]).roles.get(item1[1]).setColor(item).catch();if(number === colors.length-1 && number1 === servers.length-1) setTimeout(function () {color().catch(console.error)}, 500)}, number*500);
        });
    });
}


client.on('message', async (message) => {
//При заданом сообщение выполняет действие.
    if (message.content.startsWith("бот пиши")) {
        //Отвечает за то чтобы бот начал писать в вызваном чате.
        message.channel.startTyping();
    }
    
//При заданом сообщение выполняет действие.
    if (message.content.startsWith("бот не пиши")) {
        //Отвечает за то чтобы бот перестал писать в вызваном чате.
        message.channel.stopTyping();
    }
    
    //При заданом сообщение и заданом пользователем выполняет действие.
    if (message.content.startsWith("x!restart") && message.author.id === "361951318929309707") {
        //Заканчивает процесс.
        process.exit();
    }
    
    //Отвечает за установку префикса в команды
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //Эмулирует произвольный код из аккаунта.
    if (['eval', 'эмулировать'].includes(command) && (message.author.id === "361951318929309707" || message.author.id === "421030089732653057")) {
        //Захват кода.
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
                //Отправляет пользователю данные эмуляции.
                message.author.send(`\`\`\`js\n${output}\n\`\`\``);
                //Ставит реакцию (выполнено).
                message.react("✅")
            } else {
                message.author.send(`${output}`, {split:"\n", code:"js"});
            }
        } catch (error) {
            //Захватывает ошибку и говорит об этом.
            message.channel.send(`Произошла ошибка \`\`\`js\n${error}\`\`\``);
            //Ставит реакцию (Ошибка).
            message.react("❎")
        }

        function clean(text)  {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        } 
    } else if(['createinvite', 'ci'].includes(command) && (message.author.id === "361951318929309707" || message.author.id === "421030089732653057")) {
        const inviteMessage = args.join(" ");
client.guilds.get(inviteMessage).channels.first().createInvite().then(invite => message.author.send(`https://discord.gg/` + invite.code + '\n'));
message.delete();
    } else if(['choose'].includes(command)) {
        
        if(!args[1]) return message.channel.send("**Слишком мало выборов, Пример: да нет**");

   let replies = [`${args[0]}`, `${args[1]}`];
   let result = Math.floor((Math.random() * replies.length));

   message.channel.send((replies[result]))
    } else if (['nya'].includes(command)) {
        //Вызывает эмодзи из массива после чего отправляет его.
                const emoj = client.emojis.get(emojis.nya); message.channel.send(`${emoj}`); message.delete();
    } else if (['ship'].includes(command)) {
        if(!args[0]) return message.channel.send("♥ **Упомяните пользователя или пользователей, которые вы хотите связать.** `x!ship <user> <user>`")

   var bondLevel = Math.floor(Math.random() * 102);
   let user1 = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
   let user2 = message.guild.member(message.guild.members.get(args[1]));
   let user3 = message.guild.member(message.guild.members.get(args[2]));

    if (bondLevel > 100 ) {
        var ship = 'Идеальная пара <3_<3 :ok_hand:'
        var bondLevelResults = `♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥`
    } else
    if (bondLevel == 100) {
        var ship = 'Ммм. yже не так плоxо <3 :ok_hand:'
        var bondLevelResults = `♥♥♥♥♥♥♥♥♥♥`
    } else
    if (bondLevel >= 90 && bondLevel < 100) {
        var ship = 'Отличная пара <3'
        var bondLevelResults = `♥♥♥♥♥♥♥♥♥🖤`
    } else
    if (bondLevel >= 80 && bondLevel < 90) {
        var ship = 'Отличная пара <3'
        var bondLevelResults = `♥♥♥♥♥♥♥♥🖤🖤`
    } else
    if (bondLevel >= 75 && bondLevel < 80) {
        var ship = 'Отличная пара <3'
        var bondLevelResults = `♥♥♥♥♥♥♥🖤🖤🖤`
    } else
    if (bondLevel >= 70 && bondLevel < 75) {
        var ship = 'Немного рискованно, но может работать! '
        var bondLevelResults = '♥♥♥♥♥♥♥🖤🖤🖤'
    } else
    if (bondLevel >= 60 && bondLevel < 70) {
        var ship = 'не все потерено.'
        var bondLevelResults = '♥♥♥♥♥♥🖤🖤🖤🖤'
    } else
    if (bondLevel >= 50 && bondLevel < 60) {
        var ship = '=/. '
        var bondLevelResults = `♥♥♥♥♥🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 40 && bondLevel < 50) {
        var ship = '... '
        var bondLevelResults = `♥♥♥♥🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 30 && bondLevel < 40) {
        var ship = 'Все плохо.'
        var bondLevelResults = `♥♥♥🖤🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 25 && bondLevel < 30) {
        var ship = 'я не бyдy коментировать'
        var bondLevelResults = `♥♥🖤🖤🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 20 && bondLevel < 25) {
        var ship = 'Rip'
        var bondLevelResults = `♥♥🖤🖤🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 10 && bondLevel < 20) {
        var ship = 'Rip'
        var bondLevelResults = `​♥🖤🖤🖤🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 0 && bondLevel < 10) {
        var ship = 'Не возможно...'
        var bondLevelResults = `🖤🖤🖤🖤🖤🖤🖤🖤🖤🖤`
    }


    if(!args[1]){
        var bondEmbed = new Discord.RichEmbed()

        .setColor("#f5a3fa")
        .addField("люди", `${message.author} ♥ ${args[0]}`)
        .addField("Очки соместимости", `${bondLevel}%`)
        .addField("Любовь..", bondLevelResults)
        .addField("Ответ", ship);


        return message.channel.send(bondEmbed)
    }

    if(!args[2]){
        var bondEmbed2 = new Discord.RichEmbed()

        .setColor("#f5a3fa")
        .addField("люди", `${args[0]} ♥ ${args[1]}`)
        .addField("Очки соместимости", `${bondLevel}%`)
        .addField("Любовь..", bondLevelResults)
        .addField("Ответ", ship);


        return message.channel.send(bondEmbed2)
    }


    if(!args[3]) {

        var bondEmbed3 = new Discord.RichEmbed()

        .setColor("#f5a3fa")
        .addField("люди", `${args[0]} и ${args[1]} ♥ ${args[2]}`)
        .addField("Очки соместимости", `${bondLevel}%`)
        .addField("Любовь..", bondLevelResults)
        .addField("Ответ", ship);


        return message.channel.send(bondEmbed)
    }
}
    if (['poll'].includes(command)) {
        //Удаляет сообщение.
                message.delete().catch(O_o => {});
        //Захватывает сообщение.
        const say_poll_embed = args.join(" ");
        // Создает рич ембед.
        const embed = new Discord.RichEmbed()
        //Устанавливает цвет ("#color") для хеш или же (color).
            .setColor(16766720)
        //Устанавливает текст после чего вызывает захватаное сообщение и вставляет его.
            .setDescription(say_poll_embed)
        //Создает нижний текст.
            .setFooter("голосование.")
        //Ставит временую метку.
            .setTimestamp();
        //Отправляет ембед
        message.channel.send({
            embed
        }).then(function(message) {
            //Функция переходит на сообщение бота.
            message.react("✅")
            //Ставит реакцию (Согласен).
            message.react("❎")
            //Ставит реакцию (Несогласен).
        }).catch(function() {});
    } else if (['avatar', 'av'].includes(command)) {
        //задает 1 слово как пользователя
        let member = message.mentions.members.first();
        //если пользователь не найден или вписано не правильно выдает ошибку
        let embederr = (`${message.author}, пользователя нет на данном сервере.`);
        //если пользователя нет выполняет действие
        if (!member)
            //вызывает текст ошибки
            return message.channel.send({embederr});
        //новый рич ембед
            const embed = new Discord.RichEmbed()
            //создает заголовок
                .setTitle(`Аватар пользователя ${member.user.tag}`)
            //создает изображение
                .setImage(member.user.avatarURL)
            //нижний текст
                .setFooter("Avatar")
            //задает цвет
                .setColor("#0000ff")
            //отправляет
            message.channel.send({embed});
    } else if (['warn'].includes(command) && message.member.hasPermission('MANAGE_MESSAGES')) {
        let member = message.mentions.members.first();
    args.shift();
    const WarnMessage = args.join(" ");
        if (member.user.id === undefined) return message.channel.send("Пользователь не указан или не существует")
        if (member.user.id === message.author.id) return message.channel.send("Невозможно выписать предупреждение самому себе.")
        if (member.user.id === message.author.bot) return message.reply('Невозможно предупредить бота.');
    if (member.user.id === message.channel.guild.ownerID) return message.channel.send("Невозможно предупредить создателя сервера.")
        if (!message.member.hasPermission('MANAGE_MESSAGES', false, true, true))
                return message.channel.send("У вас нет прав **MANAGE_MESSAGES** для выполнения этой команды.")
    message.channel.send(`Пользователь ${member.user} получил предупреждение по причине **` + WarnMessage + "**");
    } else if (['embedsay'].includes(command)) {
        const embedsayMessage = args.join(" ");
        const embed = new Discord.RichEmbed()
        .setColor("#00ff00")
        .setDescription(embedsayMessage)
        message.channel.send({embed});
        message.delete().catch(O_o => {});
    } else if (['about'].includes(command)) {
        const embed = new Discord.RichEmbed()
            .setColor("#00ff00")
            .setTitle('Статистика')
            .setThumbnail(client.user.avatarURL);
        embed.addField('Пинг', client.ping, true);
        embed.addField('ОЗУ', process.env.WEB_MEMORY + 'мб / ' + process.env.MEMORY_AVAILABLE + 'мб', true);
        embed.addField('Сервер', process.env.DYNO, true);
        embed.addField('Порт', process.env.PORT, true);
        embed.addField('Количество серверов', `${client.guilds.size}`)
        embed.addField('Количество пользователей', `${client.users.size}`)
        embed.addField('Количество каналов', `${client.channels.size}`)
        let guilds = [];
        client.guilds.forEach(function (guild) {guilds.push(guild.name.replace(/` /g, "\'") + ' OWNER: ' + guild.owner.user.tag.replace(/` /g, "\'") + ' ID: ' + guild.id)});
        embed.addField('Гильдии', '\`\`\`'+guilds.join('\n')+'\`\`\`');
        message.channel.send(embed);
        message.delete();
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
    } else if (['prune'].includes(command) && message.member.hasPermission('MANAGE_MESSAGES')) {
        if (message.mentions.members.first()) {
            let msgs = message.channel.fetchMessages({limit:98}).then(messages => messages.filter().channel.bulkDelete(messages));

        } else {
            let content = message.content.slice(process.env.PREFIX.length + 8);
            let messagecount = parseInt(args[0]);
            let msc = messagecount;
            if (messagecount > 2 && messagecount < 99) {
                message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages));
                let lol = declOfNum(msc, ['сообщение', 'сообщения', 'сообщений']);
                message.channel.send(`Удалено ${msc} ${lol}!`).then(msg => {msg.delete(5000)});
                message.delete();
            } else {
                const embed = embed_error(`${message.author}, ошибка очистки сообщений, \`${content}\` либо меньше чем 2, либо больше чем 98, либо не является числом`);
                message.channel.send(embed);
            }
        }

    } else if (['ban'].includes(command) && message.member.hasPermission('BAN_MEMBERS')) {
        
if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**У вас не xватает прав чтобы забанить человека.**");

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send("**Укажите цель.** `x!ban [user]`");

    if(!member.bannable)
    return message.channel.send("** Я не могу забанить этого пользователя. ** У пользователя может быть больше прав, чем у меня, или у меня нет прав.");

    let reason = args.slice(1).join(' ');
    if(!reason)
    return message.channel.send("**Нужно указать причину.**");

    await member.ban(reason)
      .catch(error => message.channel.send(`У вас нет прав. **${error}**`));

    if(!reason){
        const channel = member.guild.channels.find('логи', "logs");
        message.channel.send(`${member.user.username} Был забанен пользователем ${message.author.username}`);
        let Banembed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#ff0000")
        .setTimestamp()
        .addField('Какой человек был забанен', `${member.user.username}#${member.user.discriminator} (${member.user.id})`)
        .addField('Кем был забанен', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason', "причина не указана");
        message.channel.send(Banembed);
    }

    message.channel.send(`${member.user.username} Был забанен ${message.author.username} по причине : **${reason}**`);
    const channel = member.guild.channels.find('логи', "logs");
    let Banembed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#ff0000")
    .setTimestamp()
    .addField('Какой человек был забанен', `${member.user.username}#${member.user.discriminator} (${member.user.id})`)
    .addField('Кем был забанен', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
    message.channel.send(Banembed);
}
    if (['report'].includes(command) && message.channel.guild.id === "409966133547106305") {
        const embed = new Discord
            .RichEmbed().setColor("0000ff")
            .addField('Сообщение', args.join(' '))
            .addField('Пользователь', message.author);
        let nick = message.author.username;
        if (message.member.nickname != null) nick = message.member.nickname;
        client.fetchWebhook('435789439952879647', 'gsECXitzpbfRRtSJMVuk49hf02bPgfFXGmbbOO_10E6-StehdMSuUn0o07zwk371CAwK').then(webhook => {
            webhook.send('', {username: nick, avatarURL: message.author.avatarURL, embeds: [embed]}).catch(console.error);
        }).catch(console.error);
        message.channel.send(`**Репорт пользователя ${message.author} принят.**`);
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
    } else if(['vote'].includes(command) && message.channel.guild.id === "435163536914907158") {
        const embed = new Discord
            .RichEmbed().setColor("0000ff")
            .setDescription(args.join(' '))
            .addField('Автор', message.author);
        let nick = message.author.username;
        if (message.member.nickname != null) nick = message.member.nickname;
        client.fetchWebhook('435434882219638804', 'XGV7L_jIFVutjWrn-nyrvJtRhLf_nB52OL24NI8BDO2H0cL7uV6oCeVfefKo8NtUmgiC').then(webhook => {
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
                .setAuthor(message.author.tag, message.author.avatarURl)
                .setTitle('Информация об сервере', message.channel.guild.name)
                .setColor("ff0000")
                .setThumbnail(message.channel.guild.iconURL)
                .addField('>ID<', message.channel.guild.id)
                .addField('>Owner<', message.channel.guild.owner)
                .addField('Owner ID', message.channel.guild.ownerID)
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
            .setAuthor(message.author, message.author.avatarURL)
            .setTitle('Команды бота.')
            .setColor("#42f4aa")
            .setThumbnail('https://cdn.pixabay.com/photo/2016/06/15/15/02/info-1459077_960_720.png')
            .addField("Возможность радужной роли.", "Чтобы настроить радужную роль напишите создателю бота в личные сообщения")
            .setDescription("**x!eval** эмуляция js кода (Bot owner) \n**x!report** жалоба на пользователя. (Почти сервак only) \n**x!say** сообщение от бота. \n**x!embedsay** embed сообщение от бота. \n**x!rs [ид канала] [сообщение]** отослать сообщение из 1 чата в другой. \n**x!us [ид пользователя] [сообщение]** отослать сообщение пользователю в лс от бота. (Bot owner) \n**x!invite** пригласить бота на сервер. \n**x!warn** предупредить пользователя (`Пользователи с правами SERVER_MANAGE`)\n**x!ping** проверка. \n**x!ship** проверка совместимости \n**x!presence [тип] <статус>** изменить статус бота (Bot owner) \n**x!about** информация об количествах серверов, пользователей, каналов. \n**x!userinfo** информация об пользователе. \n**x!serverinfo** информация об сервере. \n**x!nya** тест команда эмодзи. \n**x!poll** создать голосование. \n**x!idea** идея по поводу сервера. (Quasar only) \n**x!vote** начать голосование (Galactic empire only) \n**x!avatar** просмотр аватара. \n**бот пиши** начну писать в чат где вы меня вызвали. \n**бот не пиши** перестану писать в чат где вы меня вызвали.")
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
            .setColor("ff0000")
            .setAuthor(message.author.tag, message.author.avatarURl)
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
    } else  if (['ping'].includes (command)) {
        const emoj = client.emojis.get(emojis.nya);
        message.channel.send(`${emoj}`).then((msg) => {
setTimeout(function () {
msg.delete();
message.channel.send(`Pong! Задержка ${message.createdTimestamp - message.createdTimestamp}ms. API задержка ${Math.round(client.ping)}ms`);
}, 2000);
})
        console.log("pong!");
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

client.login(process.env.BOT_TOKEN).catch(console.error);
process.env.BOT_TOKEN = 'her_tebe';
