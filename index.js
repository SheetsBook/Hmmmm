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

async function color () {
        await colors.forEach(async function (item, number) {
                await setTimeout(async function () {client.guilds.get('419529589623357450').roles.get('427214745083576320').setColor(item).catch();if(number === colors.length-1) setTimeout(function () {color()}, 100)}, number*800);
        });
}

client.on("ready", () => {
    console.log("Запускай шарманку блять (с) стрын");
    client.user.setActivity(`x!h for help`).catch(console.error);
    color();
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
    } else if (['20197u2'].includes(command)) {
        const embed = new Discord
            .RichEmbed().setColor("ff0000")
            .setDescription(args.join(' '))
            .addField('Жалоба пользователя', message.author)
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
            .setDescription("**x!eval** эмуляция js кода (bot owner) \n**x!report** жалоба на пользователя \n**x!say** сообщение от бота. \n**бот пиши** начну писать в чат где вы меня вызвали. \n**бот не пиши** перестану писать в чат где вы меня вызвали")
            .addField('Eval', 'Позволяет владельцу бота запускать произвольный код из аккаунта бота. \nПредупреждение: Эта команда может быть чрезвычайно опасной. \nЕсли вы не знаете, что она делает, вы можете вызвать ужасные последствия | проблемы на вашем сервере или с этим ботом. \nНИКОГДА не запускайте эту команду, если вы не полностью уверены в том, за что отвечает эта команда.')
            .addField('report', '**Отключено.**')
            .addField('say', 'Команда доступная для всех, позволяет писать от имени бота')
            .setFooter("Префикс бота - x! ; Помощь - x!help")
            .setTimestamp();
        message.channel.send({embed});
    } else if(['say'].includes(command)) {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);
    } else if(['beval'].includes(command)) {
        try {
            let evaled = vm.runInContext(args.join(" "), codeContext);
            message.channel.send(evaled, {code:"js",split:"\n"});
        } catch(e) {
            message.channel.send(e, {code:"js",split:"\n"});
        }
    }
});

client.login(process.env.TOKEN).catch(console.error);
