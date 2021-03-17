const Discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")


module.exports = {
name: "fun",
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
    ${prefixx}affect
    `,`Affect a user!`,true)
    .addField(`
    ${prefixx}burn
    `,`Burn a user!`,true)
    .addField(`
    ${prefixx}changemymind
    `,`Change your mind?`,true)
    .addField(`
    ${prefixx}clyde
    `,`Discord clyde!`,true)
    .addField(`
    ${prefixx}dog
    `,`Random doggos!`,true)
    .addField(`
    ${prefixx}eject
    `,`Eject anyone else!`,true)
    .addField(`
    ${prefixx}gay
    `,`:rainbow_flag:`,true)
    .addField(`
    ${prefixx}headpat
    `,`Pat pat!`,true)
    .addField(`
    ${prefixx}howgay
    `,`:rainbow_flag:`,true)
    .addField(`
    ${prefixx}hug
    `,`Hug anyone else!`,true)
    .addField(`
    ${prefixx}pancorate
    `,`Panco rate!`,true)
    .addField(`
    ${prefixx}pat
    `,`Pat anyone else!`,true)
    .addField(`
    ${prefixx}waifurate
    `,`Waifu rate!`,true)
    .addField(`
    ${prefixx}youtube
    `,`Youtube comment!`,true)


    message.channel.send(Embed)

  },
}