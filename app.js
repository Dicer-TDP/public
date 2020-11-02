const { Client, Collection, Message } = require("discord.js");
const bot = new Client();
const fs = require("fs");
const cooldowns = new Collection();

bot.commands = new Collection();

var prefix = "hc!";

const commandFiles = fs
  .readdirSync("./command")
  .filter(file => file.endsWith(".js"));
for (const _file of commandFiles) {
  const command = require(`./command/${_file}`);
  bot.commands.set(command.name, command);
}

bot.once("ready", () => {
  bot.user.setActivity("Mencari Jatidiri нα¢кuѕαтє");
  console.log("Bot Aktif!`");
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Tunggu sebentar ${timeLeft.toFixed(
          1
        )} membutuhkan lebih banyak waktu sebelum menggunakan \`${
          command.name
        }\` perintah.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Kesalahan tidak dikenali.").catch(console.error);
  }
});

bot.login(process.env.TOKEN);
