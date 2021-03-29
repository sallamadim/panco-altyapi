const Discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")


module.exports = {
name: "moderation",
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
    ${prefixx}ban
    `,`Ban a user.`,true)
    .addField(`
    ${prefixx}banlist
    `,`See banlist.`,true)
    .addField(`
    ${prefixx}lock
    `,`Lock channel.`,true)
    .addField(`
    ${prefixx}nuke
    `,`Nuke channel.`,true)
    .addField(`
    ${prefixx}oto-role-close
    `,`Close oto role.`,true)
    .addField(`
    ${prefixx}oto-role-message
    `,`Set oto role message.`,true)
    .addField(`
    ${prefixx}oto-role-set
    `,`Set oto role.`,true)
    .addField(`
    ${prefixx}role
    `,`A role system.`,true)
    .addField(`
    ${prefixx}unban
    `,`Unban a user.`,true)
    .addField(`
    ${prefixx}unlock
    `,`Unlock channel.`,true)
    .addField(`
    ${prefixx}welcome-channel 
    `,`Set welcome-channel.`,true)
    .addField(`
    ${prefixx}channel
    `,`Channel system.`,true)
    message.channel.send(Embed)

  },
}