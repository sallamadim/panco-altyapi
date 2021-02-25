const Discord = require('discord.js')
module.exports = {
    name: "unlock",
    aliases: [],
    run: async (client, message, args) => {

        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${client.emotes.error} | You dont have permission.`)


        let channel = message.mentions.channels.first() || message.channel;
        message.channel.send(`${client.emotes.success} | Channel ${channel} has been unlocked.`).then(m => m.delete({timeout: 7000}));
        
        let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
        channel.updateOverwrite(everyone, { 'SEND_MESSAGES': null }, 'Unlocked by '+message.author.tag);
        channel.send(new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(channel.name+' has been unlocked.')
        .setDescription(`Mods had to unlock this channel.`))}
    }