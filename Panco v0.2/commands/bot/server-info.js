const Discord = require('discord.js')
module.exports = {
    name: "server-info",
    aliases: [],
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .addField(`Server owner; `, message.guild.owner)
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL({format: 'png', dynamic: true, size: 1024}))
        .addField(`Member count; `, message.guild.memberCount, true)
        .addField(`Online members; `, message.guild.members.cache.filter(a => a.presence.status === "online").size, true)
        .addField(`Do not disturb members; `, message.guild.members.cache.filter(a => a.presence.status === "dnd").size, true)
        .addField(`Offline members; `, message.guild.members.cache.filter(a => a.presence.status === "offline").size, true)
        .addField(`Idle members; `, message.guild.members.cache.filter(a => a.presence.status === "idle").size, true)
        .addField(`Bot members; `, message.guild.members.cache.filter(a => a.user.bot).size, true)
        .addField(`Channel list; `, message.guild.channels.cache.map(a => a.name).join(' , '), message.guild.channels.cache.size)
        .addField(`Channel count; `, message.guild.channels.cache.size, true)
        .addField(`AFK maximum time; `, message.guild.afkTimeout ? message.guild.afkTimeout : 'Does not have AFK channel.', true)
        .addField(`Role list; `, message.guild.roles.cache.map(r => `\`${r.name}\``).join(' '), true)
        .addField(`Total role; `, message.guild.roles.cache.size, true)
        .addField(`Server ID; `, message.guild.id)

        message.channel.send(embed)


    },
}