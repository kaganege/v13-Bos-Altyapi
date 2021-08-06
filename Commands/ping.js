module.exports = {
    name: "ping",
    description: "Botun ve Discord'un pingini gösterir",
    cooldown: 5,
    yanıt: "Ping komutunu tekrar kullanmak için {cooldown} saniye bekleyiniz",
    execute(client, message, args) {
        message.channel.send({ content: "Ping Ölçülüyor..." }).then((msg) => {
            var ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`
            :ping_pong: Pong!
            > Bot: ${ping} ms
            > Discord: ${message.client.ws.ping} ms
            `);
        });
    },
};
