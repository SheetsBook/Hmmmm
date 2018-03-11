const Discord = require("discord.js");
const { inspect } = require("util");
const vm = require("vm");
const codeContext =  {};
vm.createContext(codeContext);
const client = new Discord.Client();
const prefix = "cv!";

client.on("ready", () => {
  console.log("Bot is online!");
  client.user.setActivity(`cv!help на ${client.guilds.size} серверах!`);
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
      message.channel.send(`\`\`\`js\n${output}\n\`\`\``);
    } else {
    	  message.channel.send(`${output}`, {split:"\n", code:"js"});
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
	.RichEmbed().setColor("#ff0000")
            .setDescription(args.join(' '))
            .addField('Автор', message.author)
let nick = message.author.username;
if (message.member.nickname != null) nick = message.member.nickname;
client.fetchWebhook('422457004171460635', 'A_VCM4iSilk7MCdY97w3M-M-g3sylzQ91CDwBVLyZfTlQCdHjeGiWyb6qD4m7nCzGp4e').then(webhook => {
            webhook.send('', {username: nick, avatarURL: message.author.avatarURL, embeds: [embed]}).catch(console.error);
        }).catch(console.error);
	} else if(command === "invite") {
		message.reply("Тут могла быть ваша реклама =D")
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
