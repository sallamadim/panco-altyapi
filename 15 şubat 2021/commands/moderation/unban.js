const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "unban",
    aliases: [],
    run: async (client, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | You dont have permission.`))
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(new MessageEmbed() .setDescription(`${client.emotes.error} | I dont have permission.`))
        
        let user = args[0];
        if(!user){
            message.channel.send(`${client.emotes.error} | Please specify a valid user id.`)
        }

        const banList = await message.guild.fetchBans();
        if (!user || isNaN(user) || !banList.has(user)) {
            return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | The user is not banned from this guild.`))
        }
        message.guild.members.unban(user);
        message.channel.send(new MessageEmbed().setDescription(`${client.emotes.success} | I have unbanned the user!`))}
            }