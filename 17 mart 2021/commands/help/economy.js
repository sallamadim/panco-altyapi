const Discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")


module.exports = {
name: "economy",
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
    ${prefixx}bal
    `,`Shows your balance.`,true)
    .addField(`
    ${prefixx}daily
    `,`Get your daily award!`,true)
    .addField(`
    ${prefixx}weekly
    `,`Get your weekly award!`,true)
    .addField(`
    ${prefixx}monthly
    `,`Get your monthly award!`,true)
    .addField(`
    ${prefixx}yearly
    `,`Get your yearly award!`,true)
    .addField(`
    ${prefixx}cf
    `,`Play coin flip!`,true)
    .addField(`
    ${prefixx}slot
    `,`Play slot!`,true)
    .addField(`
    ${prefixx}stick-man
    `,`Get 3x award if you won!`,true)
    .addField(`
    ${prefixx}drop
    `,`Drop your money to a channel!`,true)
    .addField(`
    ${prefixx}pickup 
    `,`Pickup your dropped money in the channel!`,true)
    message.channel.send(Embed)

  },
}