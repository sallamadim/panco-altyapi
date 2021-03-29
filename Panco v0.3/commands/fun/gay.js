const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: `gay`,
  aliases: [],
  run: async (client, message, args) => {
    let user = message.mentions.users.first();
    if (!user) return message.channel.send(`${client.emotes.error} | Mention a user.`);
    if (user.id === message.author.id)
      return message.channel.send(`${client.emotes.error} | Are you sure about that?`);
    let avatar = user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let gay = await canvacord.Canvas.rainbow(avatar);
    let resim = new MessageAttachment(gay, "gay.png");
    return message.channel.send(resim);
  },
};