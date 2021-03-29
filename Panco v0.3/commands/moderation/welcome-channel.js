const { MessageEmbed } = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "welcome-channel",
    aliases: [],
    run: async (client, message, args) => {
      let system = await db.fetch(`welcome.ch_${message.guild.id}`)  
      let thonk = args[0]
      let channel = message.mentions.channels.last()

      if(!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send(`${client.emotes.error} | You dont have permission.`) }

      if(!thonk) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | Specify a valid thing.\n\npanco welcome-channel set #channel\npanco welcome-channel delete`)) }

      if(thonk == "set") {
        if(!channel) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | Mention a channel`))  }
        if(system) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | System already set.`)) }
        await db.set(`welcome.ch_${message.guild.id}`, channel.id)
        { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.success} | Channel has been set! ${channel}`)) }
      }
      if(thonk == "delete") {
        if(!system) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | System is not set.`)) }
        await db.delete(`welcome.ch_${message.guild.id}`)
        { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.success} | Channel has been deleted from database.`)) }
      }
    },
}