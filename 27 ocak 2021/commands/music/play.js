const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "play",
    aliases: [],
    run: async (client, message, args) => {  
        if(!message.member.voice.channel) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | You're not in voice channel.`)) }

        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | You're not in the same voice channel.`)) }

        if(!args[0]) { return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | Please indicate the title of a song.`)) }
    
        client.player.play(message, args.join(" "), { firstResult: true })

        message.channel.send(`${client.emotes.success} | Song has been added to queue.`)

        client.player


        .on('trackStart', (message, track) => {
            message.channel.send(`${client.emotes.success} | Now playing **${track.title}**...`)
        })

        .on('playlistAdd', (message, queue, playlist) => 
        message.channel.send(`${client.emotes.success} | **${playlist.title}** has been added to the queue **(${playlist.tracks.length} songs)**.`))
        
        
        .on('queueEnd', (message, queue) => 
        message.channel.send(`${client.emotes.error} | Music stopped as there is no more music in the queue.`))

        .on('channelEmpty', (message, queue) => 
        message.channel.send(`${client.emotes.error} | Music stopped as there is no more member in the voice channel.`))

        .on('botDisconnect', (message) => 
        message.channel.send(`${client.emotes.error} | Music stopped as I have been disconnected from the channel.`))

    },
}