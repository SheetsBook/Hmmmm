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
  client.user.setActivity(`x!eval`);
});

client.on('message', message => {
  if (message.content.startsWith("бот пиши")) 
  {message.channel.startTyping();
}});

client.on('message', message => {
  if (message.content.startsWith("бот не пиши")) 
  {message.channel.stopTyping();
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

        } else if(command === "rs" || command === "remote") {
		if(!message.member.roles.some(r=>[rule.own, rule.admin].includes(r.id)) && !creators.includes(message.author.id))
  			return message.reply("Извините, прав нет!");
		if (message.channel.id = undefined) return message.author.send('А канал??');
		let new_args = args;
		const chat = new_args.shift();
	 	const sayMessage = new_args.join(" ");
	 	console.log(chat);
	    message.guild.channels.get(chat).send(sayMessage).catch(()=>{message.reply('А сообщение?');});
	    message.delete().catch(O_o=>{}); 
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
