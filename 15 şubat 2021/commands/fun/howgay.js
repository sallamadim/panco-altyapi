const discord = require('discord.js')
const ms = require('parse-ms')

module.exports = {
    name: "howgay",
    aliases: [],
    run: async (client, message, args) => {
        let target = message.mentions.users.first() || message.author
        let rating = Math.floor(Math.random() * 100) + 1

        message.channel.send(new discord.MessageEmbed()
        .setTitle('gay r8 machine')
        .setDescription(`
        ${target} you are ${rating}% gay.
        `))
    },
}