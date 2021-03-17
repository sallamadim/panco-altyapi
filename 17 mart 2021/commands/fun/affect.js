const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: `affect`,
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

    let affect = await canvacord.Canvas.affect(avatar);
    let resim = new MessageAttachment(affect, "affect.png");
    return message.channel.send(resim);
  },
};
