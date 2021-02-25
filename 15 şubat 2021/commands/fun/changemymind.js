const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: `changemymind`,
  aliases: ["cmm"],
  run: async (client, message, args) => {
    let text = args.slice(0).join(" ");
    if (!text)
      return message.channel.send(
        `${client.emotes.error} | You cannot cmm empty message!`
      );
    let cmm = await canvacord.Canvas.changemymind(text);

    let resim = new MessageAttachment(cmm, "changemymind.png");
    return message.channel.send(resim);
  },
};