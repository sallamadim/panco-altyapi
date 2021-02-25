const discord = require('discord.js')
const ms = require('parse-ms')


module.exports = {
    name: "rate",
    aliases: ["rate"],
    run: async (client, message, args) => {
        let target = message.mentions.users.first() || message.author
        const rating = Math.floor(Math.random() * 100) + 1
        message.channel.send(new discord.MessageEmbed().setTitle(`
        panco r8 machine
        `).setDescription(`
        ${target} you are ${rating}% panco
        `))
    },
}