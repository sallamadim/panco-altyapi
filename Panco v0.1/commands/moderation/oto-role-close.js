
const discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
   name: "oto-role-close",
   aliases: [],
   run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) 
    return message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | You dont have enough permission.
    `))
  
    if(!kanal) return message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | Oto role already closed.
    `))
  
    await db.delete(`otok_${message.guild.id}`)  
    await db.delete(`otorol_${message.guild.id}`)   
    await db.delete(`otomesaj_${message.guild.id}`)
   message.channel.send(new discord.MessageEmbed().setDescription(`
   ${client.emotes.success} | Oto role has been closed.
   `))
}
}