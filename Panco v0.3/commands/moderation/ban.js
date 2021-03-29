const Discord = require('discord.js')

module.exports = {
    name: "ban",
    aliases: [],
    run: async (client, message, args) => {  

        if(!message.member.hasPermission("BAN_MEMBERS")){
message.channel.send(`${client.emotes.error} | You dont have permission.`)
        }
        else
        {
        let guild = message.guild
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first()
        if (!user) return message.channel.send(`${client.emotes.error} | Mention a user.`).catch(console.error);
        if (reason.length < 1) return message.channel.send(`${client.emotes.error} | Specify a reason.`);
            if(user.id == client.user.id) return message.channel.send(`${client.emotes.error} | You cant ban me.`)
            if(user.id == message.guild.owner.id) return message.channel.send(`${client.emotes.error} | I cant ban owner.`)
            if(user.id == message.author.id) return message.channel.send(`${client.emotes.error} | You cant ban yourself.`)

            if(!message.guild.me.hasPermission("BAN_MEMBERS")){ return message.channel.send(`${client.emotes.error} | I dont have permission.`)

        }
        else {
            if(message.guild.member(user).hasPermission("BAN_MEMBERS")){
                return message.channel.send(`${client.emotes.error} | I cant ban ${user}`)
            }
            else {
        guild.members.ban(user, { reason: reason })
        


        message.channel.send(`${client.emotes.success} | Banned user.`)
      
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setTimestamp()
          .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
          .addField('Author:', `${message.author.username}#${message.author.discriminator}`)
          .addField('Reason:', reason);
      message.channel.send(embed)


        }
    }
    }}}