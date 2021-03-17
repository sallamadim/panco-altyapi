const Discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")


module.exports = {
name: "music",
aliases: [],
/**
* @param {Discord.Message} message
* @param {Discord.Client} client
* @param {String[]} args
*/
run: async (client, message, args) => {
  let prefix = [
    "panco ",
    "/"
  ]
  let prefixx = prefix[Math.floor(Math.random()* prefix.length)]  
  const Embed = new Discord.MessageEmbed()
    .setFooter("Requested by; "+message.author.tag)
    .setAuthor(message.author.tag, client.user.displayAvatarURL({
      size: 1024,
      dynamic: true,
      format: "png"
    }))
    .setThumbnail(client.user.displayAvatarURL({
      size: 1024,
      dynamic: true,
      format: "png"
    }))
    .addField(`
    ${prefixx}clear-queue
    `,`Clear queue.`,true)
    .addField(`
    ${prefixx}filter
    `,`Use filters on song.`,true)
    .addField(`
    ${prefixx}loop
    `,`Loop song/queue.`,true)
    .addField(`
    ${prefixx}np
    `,`See now playing.`,true)
    .addField(`
    ${prefixx}pause
    `,`Pause music.`,true)
    .addField(`
    ${prefixx}play
    `,`Play music.`,true)
    .addField(`
    ${prefixx}queue
    `,`See queue.`,true)
    .addField(`
    ${prefixx}resume
    `,`Resume music.`,true)
    .addField(`
    ${prefixx}shuffle
    `,`Shuffle queue.`,true)
    .addField(`
    ${prefixx}skip
    `,`Skip music.`,true)
    .addField(`
    ${prefixx}stop
    `,`Stop music.`,true)
    .addField(`
    ${prefixx}volume
    `,`Set volume of music.`,true)
    .addField(`
    ${prefixx}w-filters
    `,`See opened filters.`,true)
    message.channel.send(Embed)

  },
}