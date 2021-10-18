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
const AsciiTable = require("ascii-table");
const { sahip, prefix } = require("./config.json");
const token = process.env["token"]

client.slashCommmands = new Collection();
client.commands = new Collection();

client.login(token);

require('./handlers')(client);

Promise.prototype.sil = function(time) {
  if (this)
    this.then((s) => {
      if (s.deletable) setTimeout(() => s.delete(), time * 1000);
    });
};
