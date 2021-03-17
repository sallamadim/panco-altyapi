const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "clear-queue",
    aliases: ["cq","clearqueue"],
    run: async (client, message, args) => {  
        if(!message.member.voice.channel) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | You're not in voice channel.`)) }

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | You are not in the same voice channel.`);
    
        if(!client.player.getQueue(message)) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | There is no song in queue.`)) }

        if(client.player.getQueue(message).tracks.length <= 1) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | There is **one** song in queue.`)) }

        client.player.clearQueue(message)

        message.channel.send(`${client.emotes.success} | Cleared queue and left one song, because of this api.`)
    }

}