const Discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "bal",
    aliases: [],
    run: async (client, message, args) => {
        let bals = await db.fetch(`bal_${message.author.id}`) || 0

        const embed = new Discord.MessageEmbed()
        .addField(`Your balance is; `, `${bals}`)
        message.channel.send(embed)

    }}