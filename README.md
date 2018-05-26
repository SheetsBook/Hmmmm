[![Discord Bots](https://discordbots.org/api/widget/441667160025333762.svg)](https://discordbots.org/bot/441667160025333762)


# Вы можете скопировать бота или просмотреть нужные вам команды
1.Нажать **Fork**

2.Изменить в файле **bot.js** все требования на ваш аккаунт.

3.Поменять системный **префикс** бота или оставить.

4.Зайти на сайт https://heroku.com/, если у вас нет аккаунта то создайте его.

5.Создайте новое приложение указав регион **Европа** и любое незанятое имя.

6.Авторизуйте github с heroku и в поиске выберите название данного проекта.

7.Включите auto-delpoy затем нажмите delpoy.

8.Перейдите в кладку settings и откройте системные переменные.
## Переменные

1 строка. Введите в KEY **BOT_TOKEN** напротив в VALUE введите токен бота, или свой токен для self использования.

### Возможные ошибки
Если произойдут ошибки попытайтесь убрать серверные команды такие как (vote,idea,report)

Если ошибка произошла при delpoy, зайдите в settings и добавьте пакет **nodejs**
#### Запуск
Перейдите в вкладку **ресурсы** и **выключите web** **включите worker**
###### Вы можете пронаблюдать код и взять команды которые вам требуются изменив их.
Вы можете взять команды целиком или только нужные.

Тут будут показаны некоторые.
```js
if (['avatar', 'av'].includes(command)) {
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
            }
            
## команда poll

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
        }
       
## команда warn


if (['warn'].includes(command) && message.member.hasPermission('MANAGE_MESSAGES')) {
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
    }
    
## команда ban

if (['ban'].includes(command) && message.member.hasPermission('BAN_MEMBERS')) {
        
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




Другие команды в index.js
