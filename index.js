const Discord = require("discord.js");
const { inspect } = require("util");
const vm = require("vm");
const codeContext =  {};
vm.createContext(codeContext);
const client = new Discord.Client();
const prefix = "x!";
const rule = {own: "421373056158662656", admin: "421244086557605888"}
const creators = ['207821802431315968']
const emojis = {mila:'418748638081318912'}


client.on("ready", () => {
  console.log("врум врум");
  client.user.setActivity(`x!h for help`);
});

client.on('message', message => {
  if (message.content.startsWith("бот пиши")) 
  {message.channel.startTyping();
}});

client.on('message', message => {
  if (message.content.startsWith("бот не пиши")) 
  {message.channel.stopTyping();
}});

client.on('message', message => {
  if (message.content.startsWith("оля верни стол")) 
  {message.channel.send("#ОЛЯВЕРНИСТОЛ");
}});

client.on('message', message => {
  if (message.content.startsWith("хочу бан")) 
  {memb.ban('сам этого хотел').catch(console.error);
}});

client.on("message", async(message) => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
    if (command === 'eval' || command === 'эмулировать' && (message.author.id == "207821802431315968")) {
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
	} else if(command === 'report') {
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

        } else if(command === "h" || command === "help") {
		  const embed = new Discord.RichEmbed()
	  .setTitle('Команды бота.')
	  .setColor("#42f4aa")
	  .setDescription("**x!eval** эмуляция js кода (bot owner) \n**x!report** жалоба на пользователя \n**x!say** сообщение от бота. \n**бот пиши** начну писать в чат где вы меня вызвали. \n**бот не пиши** перестану писать в чат где вы меня вызвали")
	.addField('Eval', 'Позволяет владельцу бота запускать произвольный код из аккаунта бота. \nПредупреждение: Эта команда может быть чрезвычайно опасной. \nЕсли вы не знаете, что она делает, вы можете вызвать ужасные последствия | проблемы на вашем сервере или с этим ботом. \nНИКОГДА не запускайте эту команду, если вы не полностью уверены в том, за что отвечает эта команда.')
	.addField('report', 'Если бот находится на сторонем сервере в не рамках сервера │Ø Ĥ Є Я │ прошу не использовать данную команду, \nтак как сервера разные а канал репортов всего 1. \nПозволяет отправлять репорты.')
	.addField('say', 'Команда доступная для всех, позволяет писать от имени бота')
	  .setFooter("Префикс бота - x! ; Помощь - x!help")
	  .setTimestamp();
	  message.channel.send({embed});
	} else if(command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);
	} else if(command === "beval") {
    try {
  let evaled = vm.runInContext(args.join(" "), codeContext);
  message.channel.send(evaled, {code:"js",split:"\n"});
} catch(e) {
 message.channel.send(e, {code:"js",split:"\n"});
}
}
	
});

client.login(process.env.TOKEN);
