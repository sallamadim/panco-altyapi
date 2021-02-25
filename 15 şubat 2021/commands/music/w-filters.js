const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "w-filters",
    aliases: [],
    run: async (client, message, args) => {  
        if(!message.member.voice.channel) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | You're not in voice channel.`)) }

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} | You are not in the same voice channel.`);

        if(!client.player.getQueue(message)) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | There is no song in queue.`)) }
        
        const filtersStatues = [[], []]

        client.filters.forEach((filterName) => {
            const array = filtersStatues[0].length > filtersStatues[1].length ? filtersStatues[1] : filtersStatues[0]
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ? client.emotes.open : client.emotes.off))
        })

        message.channel.send({
            embed: {
                color: "RANDOM",
                fields: [
                    { name: 'Filters', value: filtersStatues[0].join("\n"), inline: true },
                    { name: '** **', value: filtersStatues[1].join("\n"), inline: true },
                ],
                description: `List of all filters enabled or disabled.\nUse \`panco filter\` to add a filter to a song.`
            }
        })
    },
}