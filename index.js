const Discord = require("discord.js");
const { inspect } = require("util");
const vm = require("vm");
const codeContext =  {};
vm.createContext(codeContext);
const client = new Discord.Client();
const prefix = "ev.";

client.on("ready", () => {
  console.log("Я готов!");
  client.user.setPresence({ game: { name: `ev. для эмуляции`, type: 1 } }).catch();
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
    message.channel.send(`The following error occured \`\`\`js\n${error}\`\`\``);
 }

  function clean(text)  {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
   }
	} else if(command === 'help') {
		message.channel.send(`== Help ==
Тут могла быть ваша реклама.
ev. для эмуляции``, {code: "asciidoc"});
	} else if(command === "invite") {
		message.reply("Тут могла быть ваша реклама :D ")
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
