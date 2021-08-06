module.exports = {
    name: "ping",
    description: "Botun pingini gösterir",
    async execute(interaction, client) {
        const reply = await interaction.reply({ content: "Ping Ölçülüyor..." });
        console.log(reply);
        // var ping = reply.createdTimestamp - interaction.createdTimestamp;
        // await interaction.editReply(`
        //     :ping_pong: Pong!
        //     > Bot: ${ping} ms
        //     > Discord: ${client.ws.ping} ms
        //     `);
    },
};
