const Discord = require('discord.js')



const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")



module.exports = {
name: "counter",
aliases: [],
/**
* @param {Discord.Message} message
* @param {Discord.Client} client
* @param {String[]} args
*/
run: async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emotes.error} | You dont have permission.`)

    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | Wrong usage!

Examples:
\`\`\`
panco counter set #welcome-leave 100
panco counter close 
\`\`\`    
    `))
    if(args[0] === "set"){
      let kanal = message.mentions.channels.first();
      let sayı = args[2]
      if(await db.has(`sayackanal_${message.guild.id}`))return message.channel.send(`${client.emotes.error} | System is not opened.`)
      if(!kanal) return message.channel.send(`${client.emotes.error} | Mention channel.`)
      if(!sayı) return message.channel.send(`${client.emotes.error} | Specify number.`)
      if(isNaN(sayı)) return message.channel.send(`${client.emotes.error} | Thats not a number.`)
      if(sayı <= message.guild.memberCount) return message.channel.send(`${client.emotes.error} | You can only specify a number higher than server's member count.`)
      await db.set(`sayackanal_${message.guild.id}`, kanal.id)
      await db.set(`sayachedef_${message.guild.id}`, sayı)
      message.channel.send(`${client.emotes.error} | Number and channel has been set! **${kanal}** - **${sayı}**`)
    }
    if(args[0] === "close"){
      if(!await db.has(`sayackanal_${message.guild.id}`)) return message.channel.send(`${client.emotes.error} | System is not opened.`)
      await db.delete(`sayackanal_${message.guild.id}`)
      await db.delete(`sayackanal_${message.guild.id}`)
      message.channel.send(`${client.emotes.error} | Deleted from database.`)
    }


},
}