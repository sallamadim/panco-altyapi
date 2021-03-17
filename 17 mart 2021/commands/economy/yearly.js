const Discord = require('discord.js')

const ms = require('parse-ms')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "yearly",
    aliases: [],
    run: async (client, message, args) => {
        let bals = await db.fetch(`bal_${message.author.id}`)

        let cool = 31104000000

        let last = await db.fetch(`bal.cool3_${message.author.id}`)
        if(last !== null && cool - (Date.now() - last) > 0) {
            let time = ms(cool - (Date.now() - last))

            const embed = new Discord.MessageEmbed()
            .addField(`${client.emotes.error} | To use this command you need to wait; `, `
            **${time.days}** days, **${time.hours}** hours, **${time.minutes}** minutes, **${time.seconds}** seconds.`)

            message.channel.send(embed)


        } else {
            let amount = [
                "300",
                "250",
                "350",
                "275",
                "200"
            ]
            let key = amount[Math.floor(Math.random() * amount.length)]

            const embed = new Discord.MessageEmbed()
            .setDescription(`${client.emotes.success} | You have collected your yearly award!\n\nYou got **${key}** money!`)
            message.channel.send(embed)
            await db.add(`bal_${message.author.id}`, key)
            await db.set(`bal.cool3_${message.author.id}`, Date.now())
        }
    }}