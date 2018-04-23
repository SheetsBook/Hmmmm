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
const colors = ['#ff0b0b', '#00e9ff', '#d600ff', '#ff4200', '#36ff00', '#f9ff00'];
//Выполняет действие когда бот запустился.
client.on("ready", () => {
    //Отпраляет сообщение в логи что бот запущен (+ количество серверов).
    console.log(`Успешный старт. ${client.guilds.size} серверов`);
    //Ставит боту статус.
    client.user.setActivity(`x!h for help ${client.guilds.size} servers`).catch(console.error);
    //Функция необходимая для запуска радуги.
    color();
});

const servers = [['352435714773876736', '437555148743507968'],['419529589623357450', '427214745083576320'], ['409966133547106305', '437272573059923991']];

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
    } else if (['choose'].includes(command)) {
        
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
    } else if (['image'].includes(command)) {
        message.channel.send(":**`**:<:m_01:432635690136764438><:m_02:432635690606395422><:m_03:432635690640080906><:m_04:432635690308599839><:m_05:432635690652663808><:m_06:432635690812047380><:m_07:432635690568777731><:m_08:432635691151785985><:m_09:432635691269095425><:m_10:432635691369889792><:m_11:432635691529142302><:m_12:432635691784994848><:m_13:432635699116769290><:m_14:432635695862120448><:m_15:432635695748874260><:m_16:432635695740223519><:m_17:432635699133546496><:m_18:432635698974294037><:m_19:432635698961448963><:m_20:432635699171295242><:m_21:432635699083083798><:m_22:432635698957516823><:m_23:432635699318226964><:m_24:432635699158843423><:m_25:432635699351781408>:**`**:")
     message.channel.send(":**`**:<:m_26:432635699150192652><:m_27:432635699204849665><:m_28:432635699431211049><:m_29:432635699561234432><:m_30:432635699850641418><:m_31:432635699632799744><:m_32:432635699427016735><:m_33:432635699351781413><:m_34:432635700098367509><:m_35:432635700232454168><:m_36:432635701784346635><:m_37:432635700186447883><:m_38:432635701142487040><:m_39:432635701000011797><:m_40:432635701180366858><:m_41:432635701276966915><:m_42:432635701272641536><:m_43:432635701163589643><:m_44:432635701151137816><:m_45:432635701511585802><:m_46:432635701402664971><:m_47:432635701398339585><:m_48:432635701658386432><:m_49:432635701708849152><:m_50:432635701545402389>:**`**:")
     message.channel.send(":**`**:<:m_51:432636155155054602><:m_52:432636155012317206><:m_53:432636155029225474><:m_54:432636155331346432><:m_55:432636155259912193><:m_56:432636155276820481><:m_57:432636155494662165><:m_58:432636155943452672><:m_59:432636156195242004><:m_60:432636156052635650><:m_61:432636156828712981><:m_62:432636156975251467><:m_63:432636157059137537><:m_64:432636157214457877><:m_65:432636157390749696><:m_66:432636157415653387><:m_67:432636157314990082><:m_68:432636157847928832><:m_69:432636157969563648><:m_70:432636158086873088><:m_71:432636157965107221><:m_72:432636157868769312><:m_73:432636160049807360><:m_74:432636160213516298><:m_75:432636160335020042>:**`**:")
     message.channel.send(":**`**:<:m_76:432636160272105479><:m_77:432636160313917453><:m_78:432636160905314304><:m_79:432636160796524545><:m_80:432636160825753615><:m_81:432636161492647936><:m_82:432636161488584704><:m_83:432636161266155541><:m_84:432636161513619456><:m_85:432636161677066240><:m_86:432636161823866890><:m_87:432636161899626507><:m_88:432636162029518848><:m_89:432636162017067019><:m_90:432636162239102977><:m_91:432636162390097930><:m_92:432636162625241088><:m_93:432636162792882176><:m_94:432636163061186560><:m_95:432636163111518218><:m_96:432636163006791682><:m_97:432636165372510208><:m_98:432636165146017793><:m_99:432636165259132928><:m_100:432636165066063873>:**`**:")
     message.channel.send(":**`**:<:m_101:432636232321990656><:m_102:432636232170995712><:m_103:432636232011612161><:m_104:432636231839383563><:m_105:432636231868874763><:m_106:432636231902560257><:m_107:432636232112144387><:m_108:432636232602877952><:m_109:432636232657272832><:m_110:432636232829239306><:m_111:432636232485568524><:m_112:432636232783233025><:m_113:432636233223766017><:m_114:432636234125410306><:m_115:432636234544840714><:m_116:432636234263822350><:m_117:432636234763075584><:m_118:432636234494377995><:m_119:432636234985373716><:m_120:432636237535379457><:m_121:432636241213915136><:m_122:432636240156688385><:m_123:432636240324591619><:m_124:432636240437837844><:m_125:432636240559341568>:**`**:")
     message.channel.send(":**`**:<:m_126:432636240727375882><:m_127:432636240748347392><:m_128:432636240555278339><:m_129:432636241020977155><:m_130:432636240676782080><:m_131:432636240748347412><:m_132:432636240412803073><:m_133:432636240924508160><:m_134:432636240890953728><:m_135:432636240957931520><:m_136:432636241037754389><:m_137:432636241364910100><:m_138:432636241511710730><:m_139:432636241360453663><:m_140:432636241339744276><:m_141:432636241859706890><:m_142:432636241842929675><:m_143:432636242048319519><:m_144:432636241910038550><:m_145:432636241960370197><:m_146:432636242367086594><:m_147:432636242685853696><:m_148:432636242962939914><:m_149:432636242719539215><:m_150:432636243197689856>:**`**:")
     message.channel.send(":**`**:<:m_176:432636320532398081><:m_177:432636320268025857><:m_178:432636320565690379><:m_179:432636323380330511><:m_180:432636323321479169><:m_181:432636323568812032><:m_182:432636323527131147><:m_183:432636323354902531><:m_184:432636323686514735><:m_185:432636323719807026><:m_186:432636323728457738><:m_187:432636323770269696><:m_188:432636323598172162><:m_189:432636323598434325><:m_190:432636323933716480><:m_191:432636323560423425><:m_192:432636323720069120><:m_193:432636323430662150><:m_194:432636323296313345><:m_195:432636323719938068><:m_196:432636323854155776><:m_197:432636324059807754><:m_198:432636324198088704><:m_199:432636324244357120><:m_200:432636324327981056>:**`**:")
     message.channel.send(":**`**:<:m_201:432636367605071883><:m_202:432636367265202176><:m_203:432636367529312256><:m_204:432636367596421130><:m_205:432636367592489000><:m_206:432636367609266176><:m_207:432636367554740224><:m_208:432636367554740235><:m_209:432636367516860418><:m_210:432636368095674388><:m_211:432636369236525057><:m_212:432636369320280087><:m_213:432636369597366272><:m_214:432636369802887169><:m_215:432636369953882113><:m_216:432636373170913281><:m_217:432636373317451787><:m_218:432636373409726464><:m_219:432636373405532161><:m_220:432636373804253194><:m_221:432636374026289162><:m_222:432636373820899380><:m_223:432636374315696145><:m_224:432636374127214614><:m_225:432636374550708225>:**`**:")
     message.channel.send(":**`**:<:m_226:432636374576005140><:m_227:432636375041310740><:m_228:432636374743515157><:m_229:432636375075127308><:m_230:432636375674912768><:m_231:432636375582375957><:m_232:432636375758667776><:m_233:432636376597528577><:m_234:432636376207327242><:m_235:432636378963116032><:m_236:432636379181350914><:m_237:432636378673840139><:m_238:432636378615119884><:m_239:432636378673840130><:m_240:432636378774241281><:m_241:432636378724171788><:m_242:432636378900070433><:m_243:432636379332083712><:m_244:432636378942144545><:m_245:432636379328151572><:m_246:432636379428814859><:m_247:432636379638267925><:m_248:432636379776811008><:m_249:432636380003172380><:m_250:432636380024406018>:**`**:")
     message.channel.send(":**`**:<:m_251:432636418049966090><:m_252:432636417689124875><:m_253:432636418116943872><:m_254:432636418037252097><:m_255:432636417978531860><:m_256:432636418293104640><:m_257:432636418171600897><:m_258:432636418284847106><:m_259:432636418393767947><:m_260:432636418540568586><:m_261:432636420268752896><:m_262:432636419908042753><:m_263:432636420163895296><:m_264:432636426253762562><:m_265:432636426597826560><:m_266:432636426887233546><:m_267:432636426509615115><:m_268:432636427604328449><:m_269:432636427399069698><:m_270:432636427507990532><:m_271:432636427629625344><:m_272:432636427105468432><:m_273:432636427461722144><:m_274:432636427897929728><:m_275:432636427948392448>:**`**:")
     message.channel.send(":**`**:<:m_276:432636428392988702><:m_277:432636428376211457><:m_278:432636428862750721><:m_279:432636428938379264><:m_280:432636429257146380><:m_281:432636429252820992><:m_282:432636429135380500><:m_283:432636429433044992><:m_284:432636429437239296><:m_285:432636429781434388><:m_286:432636429852606466><:m_287:432636430053801994><:m_288:432636429798080513><:m_289:432636429881835531><:m_290:432636430410317845><:m_291:432636430313979906><:m_292:432636430674821140><:m_293:432636430766964736><:m_294:432636430947188737><:m_295:432636431077212170><:m_296:432636431085862915><:m_297:432636431446441984><:m_298:432636431664545794><:m_299:432636431769403402><:m_300:432636432008609795>:**`**:")
     message.channel.send(":**`**:<:m_301:432636479156781086><:m_302:432636479039209474><:m_303:432636479173558272><:m_304:432636478879957014><:m_305:432636478984552459><:m_306:432636479282348032><:m_307:432636479047729153><:m_308:432636479265701909><:m_309:432636479731400734><:m_310:432636479601246208><:m_311:432636480188317696><:m_312:432636480230260736><:m_313:432636480259883018><:m_314:432636480113082370><:m_315:432636480624656404><:m_316:432636480771325973><:m_317:432636480893091840><:m_318:432636481203470336><:m_319:432636483162079252><:m_320:432636483220930573><:m_321:432636483384508417><:m_322:432636483388571668><:m_323:432636483611131924><:m_324:432636483879305216><:m_325:432636483883761665>:**`**:")
     message.channel.send(":**`**:<:m_326:432636484055728128><:m_327:432636483824910337><:m_328:432636484198072351><:m_329:432636484172906507><:m_330:432636484194009111><:m_331:432636484328095757><:m_332:432636484562976778><:m_333:432636484328357900><:m_334:432636484919623680><:m_335:432636485099847700><:m_336:432636485196316672><:m_337:432636485309693952><:m_338:432636485477466122><:m_339:432636485372739584><:m_340:432636485251104769><:m_341:432636485603295233><:m_342:432636485846564865><:m_343:432636485737381909><:m_344:432636485863211008><:m_345:432636486123257858><:m_346:432636486073188362><:m_347:432636487985659905><:m_348:432636488476393472><:m_349:432636488295907329><:m_350:432636488778383370>:**`**:")
     message.channel.send(":**`**:<:m_351:432636542003970061><:m_352:432636541446389781><:m_353:432636541270097921><:m_354:432636541513498625><:m_355:432636541399990273><:m_356:432636541718757386><:m_357:432636541727145984><:m_358:432636542092312587><:m_359:432636541861494786><:m_360:432636542184456193><:m_361:432636542356291584><:m_362:432636542335451137><:m_363:432636542591303690><:m_364:432636542704549898><:m_365:432636543065260042><:m_366:432636543052546088><:m_367:432636543065260053><:m_368:432636543388221440><:m_369:432636545099497472><:m_370:432636544768278549><:m_371:432636544692781061><:m_372:432636545200291845><:m_373:432636545233846283><:m_374:432636545321926657><:m_375:432636547934847008>:**`**:")
     message.channel.send(":**`**:<:m_376:432636548282974209><:m_377:432636548534501377><:m_378:432636548484431913><:m_379:432636548807131146><:m_380:432636549104926720><:m_381:432636548979097600><:m_382:432636548987486208><:m_383:432636548685627394><:m_384:432636548970840074><:m_385:432636548576706571><:m_386:432636548656136206><:m_387:432636548580638741><:m_388:432636548970708993><:m_389:432636549100863488><:m_390:432636549201526794><:m_391:432636548597678092><:m_392:432636548643553301><:m_393:432636548677107713><:m_394:432636548962320384><:m_395:432636549218435073><:m_396:432636548836753410><:m_397:432636548664524813><:m_398:432636549029429248><:m_399:432636549033754634><:m_400:432636549822283786>:**`**:")
     message.channel.send(":**`**:<:m_401:432636618705338398><:m_402:432636618738761739><:m_403:432636618533371906><:m_404:432636619003002880><:m_405:432636619221368852><:m_406:432636619334615050><:m_407:432636619649187851><:m_408:432636619393204275><:m_409:432636619493867521><:m_410:432636619883806730><:m_411:432636620169281536><:m_412:432636620148178945><:m_413:432636620483723274><:m_414:432636622102724610><:m_415:432636622710767616><:m_416:432636622761361418><:m_417:432636622966882304><:m_418:432636622710898690><:m_419:432636623126134795><:m_420:432636623012888588><:m_421:432636623511879691><:m_422:432636623310815243><:m_423:432636623683977228><:m_424:432636623491039234><:m_425:432636623792898051>:**`**:")
     message.delete();
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
    } else if (['hug'].includes(command)) {
    	let member = message.mentions.members.first();
        message.reply(`Пользователь ${message.author} обнял ` + member.user + `ss`)
    	message.delete(1000);
    } else if (['about'].includes(command)) {
        message.channel.send(`${client.guilds.size} серверов всего. \n${client.users.size} пользователей всего. \n${client.channels.size} каналов всего.`)
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

    } else if (['report'].includes(command) && message.channel.guild.id === "409966133547106305") {
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
            .setTitle('Команды бота.')
            .setColor("#42f4aa")
            .setThumbnail('https://cdn.pixabay.com/photo/2016/06/15/15/02/info-1459077_960_720.png')
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
