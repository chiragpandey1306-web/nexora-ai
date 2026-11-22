require("dotenv").config();

const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const { chat } = require("./ai");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`NEXORA online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const isMentioned = message.mentions.has(client.user);
  const isAsk = message.content.startsWith("!ask ");

  if (!isMentioned && !isAsk) return;

  const prompt = message.content
    .replace(`<@${client.user.id}>`, "")
    .replace(`<@!${client.user.id}>`, "")
    .replace(/^!ask\s+/i, "")
    .trim();

  if (!prompt) {
    return message.reply("What would you like me to do?");
  }

  try {
    await message.channel.sendTyping();

    const response = await chat(prompt);
    const answer =
      typeof response === "string"
        ? response
        : response?.message?.content ??
          response?.text ??
          "I couldn't generate a response.";

    await message.reply(String(answer).slice(0, 1900));
  } catch (error) {
    console.error("AI Error:", error);
    await message.reply("AI is temporarily unavailable. Try again later.");
  }
});

client.login(process.env.DISCORD_TOKEN);
