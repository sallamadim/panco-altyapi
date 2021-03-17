
const discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
  name: "oto-role-message",
  aliases: [],
  run: async (client, message, args) => {

    {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have enough permission.        
        
        
        `))
            
            
            {
      let mesaj = args.slice(0).join(' ');
      if(mesaj.length < 5) return message.channel.send(
        new discord.MessageEmbed().setDescription(`
        ${client.emotes.error} | You cant set message lower than **5**.
        `)
      )
      
     message.channel.send(
         new discord.MessageEmbed().setDescription(`
         ${client.emotes.success} | Oto role message has been set.

         Message;
        \`${mesaj}\`
         `)
     )    
     await db.set(`otomesaj_${message.guild.id}`, mesaj)  
    };
      }}
          }