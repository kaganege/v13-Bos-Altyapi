module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        if (!client.slashCommmands.has(interaction.commandName)) return;

        try {
            await client.slashCommmands
                .get(interaction.commandName)
                .execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "Bu komutu çalıştırırken bir sorun ile karşılaştım!",
                ephemeral: true,
            });
        }
    },
};
