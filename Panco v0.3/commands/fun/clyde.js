const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: `clyde`,
  aliases: [],
  run: async (client, message, args) => {
    let text = args.slice(0).join(" ");
    if (!text)
      return message.channel.send(`${client.emotes.error} | Clyde cant send empty messages too!`);
    let clyde = await canvacord.Canvas.clyde(text);
    let resim = new MessageAttachment(clyde, "clyde.png");
    return message.channel.send(resim);
  },
};