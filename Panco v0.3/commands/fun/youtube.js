const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  name: `youtube`,
  aliases: ["yt"], 
  run: async (client, message, args) => {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let cont = args.slice(0).join(" ");
    if (!cont)
      return message.channel.send(`${client.emotes.error} | You cant comment empty message!`);

    let yutup = await canvacord.Canvas.youtube({
      username: message.author.username,
      content: cont,
      avatar: avatar,
      dark: true,
    });
    let resim = new MessageAttachment(yutup, "youtubecomment.png");
    return message.channel.send(resim);
  },
};