const Discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")


module.exports = {
name: "help",
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
    .setDescription(`${client.user.username} help command`)
    .setThumbnail(client.user.displayAvatarURL({
      size: 1024,
      dynamic: true,
      format: "png"
    }))

    .addField(`
    ${prefixx}bot
    `,`Shows bot commands.`,true)
    .addField(`
    ${prefixx}counter-system
    `,`Shows counter system commands.`,true)
    .addField(`
    ${prefixx}economy
    `,`Shows economy commands.`,true)
    .addField(`
    ${prefixx}fun
    `,`Shows fun commands.`,true)
    .addField(`
    ${prefixx}giveaway
    `,`Shows giveaway commands.`,true)
    .addField(`
    ${prefixx}level-system
    `,`Shows level systems.`,true)
    .addField(`
    ${prefixx}moderation
    `,`Shows moderation commands.`, true)
    .addField(`
    ${prefixx}music
    `,`Shows music commands.`,true)
    .addField(`
    ${prefixx}premium-commands
    `,`Premium commands.`,true)
    message.channel.send(Embed)

  },
}