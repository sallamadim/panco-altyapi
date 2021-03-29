const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: "cat",
    aliases: [],
    run: async (client, message, args) => {

        fetch("http://aws.random.cat/meow")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply(`${client.emotes.error} | Got an error.`)

            let embed = new MessageEmbed()
            .setImage(body.file)
message.channel.send(embed)      
        })

    },
}