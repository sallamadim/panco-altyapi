const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: `burn`,
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

    let burn = await canvacord.Canvas.burn(avatar, 15);

    let resim = new MessageAttachment(burn, "burn.png");
    return message.channel.send(resim);
  },
};