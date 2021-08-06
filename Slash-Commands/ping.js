module.exports = {
    name: "ping",
    description: "Botun pingini gösterir",
    async execute(interaction, client) {
        await interaction.reply({ content: "Ping Ölçülüyor..." });
        await interaction.editReply(`
            :ping_pong: Pong!
            > ${client.ws.ping} ms
            `);
    },
};
