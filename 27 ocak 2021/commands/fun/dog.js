const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: "dog",
    aliases: [],
    run: async (client, message, args) => {

        fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply(`${client.emotes.error} | Got an error.`)
message.channel.send(new MessageEmbed().setImage(body.message))
        
        
        })
    },
}