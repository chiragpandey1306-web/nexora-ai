const { init } = require("@heyputer/puter.js/src/init.cjs");

let puterInstance;

function getPuter() {
  if (!process.env.PUTER_AUTH_TOKEN) {
    throw new Error("Puter authentication is not configured.");
  }

  if (!puterInstance) {
    puterInstance = init(process.env.PUTER_AUTH_TOKEN);
  }

  return puterInstance;
}

async function chat(prompt) {
  const puter = getPuter();
  return await puter.ai.chat(prompt);
}

async function generateImage(prompt) {
  const puter = getPuter();
  const image = await puter.ai.txt2img(prompt);
  return image.src;
}

module.exports = { chat, generateImage };
