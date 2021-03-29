const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "filter",
    aliases: [],
    run: async (client, message, args) => {  
        if(!message.member.voice.channel) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | You are not in voice channel.`)) }

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | You are not in the same voice channel.`);

        if(!client.player.getQueue(message)) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | There is no song in queue.`)) }

        if(!args[0]) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | Please specify a valid filter to enable or disable.`)) }

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase())

        if(!filterToUpdate) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | This filter doesn't exist, try for example (8D, vibrato, pulsator...).`)) }

        const filtersUpdated = {}

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true

        client.player.setFilters(message, filtersUpdated)

        if(filtersUpdated[filterToUpdate]) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.music} | I'm **adding** the filter to the music, please wait... Note : the longer the music is, the longer this will take.`)) }

        else message.channel.send(new MessageEmbed().setDescription(`${client.emotes.music} | I'm **disabling** the filter on the music, please wait... Note : the longer the music is playing, the longer this will take.`))
    },
}