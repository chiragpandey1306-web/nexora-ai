const { SlashCommandBuilder } = require("discord.js");

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Check Nexora's response speed"),

    async execute(interaction) {
      await interaction.reply("Pong! Nexora is online. ⚡");
    }
  }
];
