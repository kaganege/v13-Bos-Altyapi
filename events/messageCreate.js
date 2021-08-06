const { sahip, geliştiriciler, prefix } = require("../config.json");

module.exports = {
    name: "messageCreate",
    async execute(message, client, Discord) {
        if (!client.application?.owner) await client.application?.fetch();

        var hata = new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(`${message.author.tag}`, message.author.avatarURL());

        const cooldowns = new Discord.Collection();

        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!message.content.startsWith(prefix) || !command) return;

        if (message.author.bot) return;

        if (command.devOnly && !geliştiriciler.includes(message.author.id)) {
            hata.setTitle("Uyarı!");
            hata.setDescription(
                "Bu komutu sadece botun sahipleri kullanabilir!"
            );
            message.channel.send(hata);
            return;
        }

        if (command.testOnly && !geliştiriciler.includes(message.author.id)) {
            hata.setTitle("Uyarı!");
            hata.setDescription("Bu komut test aşamasında!");
            message.channel.send(hata);
            return;
        }

        if (command.guildOnly && message.channel.type == "dm") {
            hata.setTitle("Başarısız!");
            hata.setDescription("Bu komut sadece **sunucu**larda çalışır!");
            message.channel.send(hata);
            return;
        }

        if (
            command.permission &&
            message.member.hasPermission(command.permission)
        ) {
            hata.setTitle("Başarısız!");
            hata.setDescription(
                `Bu komutu sadece \`${command.permission}\` yetkisi olanlar kullanabilir`
            );
            message.channel.send(hata);
        }

        if (
            command.botPermission &&
            !message.guild.me.hasPermission(command.botPermission)
        ) {
            hata.setTitle("Başarısız!");
            hata.setDescription(
                `Bu komutu çalıştırmam için \`${command.botPermission}\` yetkisine ihtiyacım var.`
            );
            message.channel.send(hata);
        }

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const timestamps = cooldowns.get(command.name);
        //const ctimestamps = cc.get(command.name)
        const şuan = Date.now();
        const beklemeSüresi = (command.cooldown || 5) * 1000;
        var ynt =
            command.yanıt ||
            "Lütfen bu komutu tekrar kullanmak için `{cooldown}` saniye bekleyiniz";

        if (timestamps.has(message.author.id)) {
            const sonSüre = timestamps.get(message.author.id) + beklemeSüresi;
            if (sonSüre > şuan) {
                //cc.set(command.name, message.author.id)
                const süreBitiş = (sonSüre - şuan) / 1000;
                var yanıt = ynt.replace(/{cooldown}/g, parseInt(süreBitiş));
                if (message.channel.type == "dm") {
                    hata.setTitle("Başarısız!");
                    hata.setDescription(yanıt);
                    message.channel.send(hata).sil(parseInt(süreBitiş) * 1000);
                } else {
                    hata.setTitle("Başarısız!");
                    hata.setDescription(yanıt);
                    message.channel.send(hata).sil(parseInt(süreBitiş) * 1000);
                }
                return;
            }
        }

        if (message.author.id !== sahip)
            timestamps.set(message.author.id, şuan);
        //if (message.author.id !== sahip) ctimestamps.set(message.author.id, şuan)
        setTimeout(() => {
            if (message.author.id !== sahip)
                timestamps.delete(message.author.id);
            //if (message.author.id !== sahip) ctimestamps.delete(message.author.id)
        }, beklemeSüresi);

        try {
            command.execute(client, message, args, Discord);
        } catch (e) {
            console.error(e);
            hata.setTitle("Hata!");
            hata.setDescription(
                "Maalesef bu komutu çalıştırırken bir sorunla karşılaştım"
            );
            message.channel.send(hata);
        }

        if (
            message.content.toLowerCase() === "!kur" &&
            message.author.id === sahip
        ) {
            const data = [
                {
                    name: "ping",
                    description: "Botun pingini gösterir.",
                }
            ];

            const command = await client.application?.commands.set(data);
            console.log(command.name+' Komutu Yüklendi');
            message.channel.send(
                "Slash Komutlar Kuruldu! Lütfen botu atıp bu linkten tekrar davet ediniz: " +
                    `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`
            );
        }
    },
};
