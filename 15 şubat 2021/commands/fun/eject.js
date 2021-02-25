const randoms = require("random-number-csprng");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: `eject`,
  aliases: [],
  run: async (client, message, args) => {
    let user = await message.mentions.users.first();
    if (!user) return message.channel.send(client.emotes.error+ " | Who You Are Going To Eject?");
    if (user.id === message.author.id)
      return message.channel.send(client.emotes.error + " | Hmmm.. I Dont Really Suggest That..");
    let random = await randoms(0, 1);
    let isimp;
    if (random === 0) isimp = true;
    if (random === 1) isimp = false;
    const colors = [
      "black",
      "blue",
      "brown",
      "cyan",
      "darkgreen",
      "lime",
      "orange",
      "pink",
      "purple",
      "red",
      "white",
      "yellow",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const api = await fetch(
      `https://vacefron.nl/api//ejected?name=${user.username}&impostor=${isimp}&crewmate=${color}`
    );
    let msg;
    if (isimp === true) msg = `${user.username} Was The Impostor`;
    if (isimp === false) msg = `${user.username} Was Not The Impostor`;
    const embed = new MessageEmbed()
      .setColor("PING")
      .setImage(api.url)
      .setTitle(`${user.username} Has Ejected!`)
      .setFooter(msg);
    message.channel.send(embed);
  },
};