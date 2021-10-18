const Discord = require("discord.js");
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");
const AsciiTable = require("ascii-table");
const { sahip, prefix } = require("./config.json");
const token = process.env["token"]
const rest = new REST({ version: '9' }).setToken(token);

client.slashCommmands = new Collection();
client.commands = new Collection();

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) =>
      event.execute(...args, client, Discord)
    );
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, client, Discord)
    );
  }
}

const commandFiles = fs
  .readdirSync("./Commands")
  .filter((file) => file.endsWith(".js"));

console.log(`${commandFiles.length} Komut Yüklenecek!`);

commandFiles.forEach((file) => {
  const command = require(`./Commands/${file}`);
  console.log("Yüklenen komut: " + command.name);
  client.commands.set(command.name, command);
});

const slashCommandFiles = fs
  .readdirSync("./Slash-Commands")
  .filter((file) => file.endsWith(".js"));

console.log(`${slashCommandFiles.length} Slash Komutu Yüklenecek!`);

var data = []
for (const file of slashCommandFiles) {
  const command = require(`./Slash-Commands/${file}`);
  console.log("Yüklenen slash komutu: " + command.name);
  client.slashCommmands.set(command.name, command);
  data.push(new SlashCommandBuilder().setName(command.name).setDescription(command.description))
}

data.map(cmd => cmd.toJSON())

setTimeout(async () => {
  rest.put(Routes.applicationCommands(client.user.id), {body: data})
  .then(() => console.log('Slash Komutları kuruldu!'))
	.catch(console.error);
}, 500);

client.login(token);

Promise.prototype.sil = function(time) {
  if (this)
    this.then((s) => {
      if (s.deletable) setTimeout(() => s.delete(), time * 1000);
    });
};