module.exports = {
  name: "ping",
  description: "Botun pingini gösterir",
  async execute(interaction, client) {
    await interaction.reply({ content: "Ping Ölçülüyor..." });
    const message = await interaction.fetchReply();
    var ping = message.createdTimestamp - interaction.createdTimestamp;
    await message.edit(`
        :ping_pong: Pong!
        > Bot: ${ping} ms
        > Discord: ${client.ws.ping} ms
        `);
  },
};
