require("dotenv").config();

const { REST, Routes } = require("discord.js");
const commands = require("./commands");

const rest = new REST({ version: "10" })
  .setToken(process.env.DISCORD_TOKEN);

async function deploy() {
  try {
    console.log("Registering NEXORA commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      {
        body: commands.map(command => command.data.toJSON())
      }
    );

    console.log("NEXORA commands registered!");
  } catch (error) {
    console.error(error);
  }
}

deploy();
