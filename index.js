const Discord = require("discord.js");
const { inspect } = require("util");
const vm = require("vm");
const codeContext =  {};
vm.createContext(codeContext);
const client = new Discord.Client();
const prefix = "x!";
const rule = {own: "421373056158662656"}
const creators = ['207821802431315968']
const emojis = {mila:'418748638081318912'}


client.on("ready", () => {
  console.log("Bot is online!");
  client.user.setActivity(`x!help |${client.guilds.size} серверов.`);
});

client.on("message", async(message) => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	if(command === 'eval') {
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
const emoj = client.emojis.get(emojis.mila);
        message.channel.send(`${emoj} ${message.author}`);
        } else if(command === "help" || command === "хелп") {
		  const embed = new Discord.RichEmbed()
	  .setTitle('Команды бота CloudBot')
	  .setColor("#42f4aa")
	  .setDescription("cv!say - бот вам что-то скажет \ncv!report написать репорт на пользователя \ncv!eval эмулировать js код \nСкоро будет больше команд")
	  .setFooter("Префикс бота - cv! ; Помощь - cv!help")
	  .setTimestamp();
	  message.channel.send({embed});
	} else if(command === "say") {
		if(!message.member.roles.some(r=>[rule.own].includes(r.id)) && !creators.includes(message.author.id))
  			return message.reply("Извините, прав нет!");
		let content = message.content.slice(process.env.PREFIX.length + 8);
		let messagecount = parseInt(args[0])+1;
		let msc = messagecount -1;
		if (messagecount > 2) {
			message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
		let lol = declOfNum(msc, ['сообщение', 'сообщения', 'сообщений']);
		message.channel.send(`Удалено ${msc} ${lol}!`).then(msg => {msg.delete(5000)});
		message.delete();
		} else {
			message.author.send({embed: {
				color: 16711680,
				title: "Ошибка удаления сообщений",
				description: `\`${content}\` либо меньше двух, либо не является числом.`,
				footer: {
				  	text: "CloudVoice",
			  	},
			}});
		}
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
