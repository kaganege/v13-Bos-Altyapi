const AsciiTable = require("ascii-table");
const { sahip, prefix } = require("../config.json");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    var table = new AsciiTable("Komutlar Yüklendi!")
      .addRow("Prefix", prefix)
      .addRow("Bot Adı", client.user.tag)
      .addRow("Sahip", client.users.cache.get(sahip).tag)
      .addRow("Durum", "Online");
    console.log(table.toString());
  },
};
