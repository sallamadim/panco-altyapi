const Discord = require('discord.js')
const { stripIndents } = require('common-tags')
const ms = require('parse-ms')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "slot",
    aliases: [],
/**
* @param {Discord.Message} message
* @param {Discord.Client} client
* @param {String[]} args
*/
    run: async (client, message, args) => {
        let cool = 30000

        let last = await db.fetch(`slot.cool_${message.author.id}`)
        if(last !== null && cool - (Date.now() - last) > 0) {
            let time = ms(cool - (Date.now() - last))

            const embed = new Discord.MessageEmbed()
            .addField(`${client.emotes.error} | To use this command you need to wait; `, `
            **${time.seconds}** seconds.`)

            message.channel.send(embed)


        } else {
        function embed(description) {
            const embed = new Discord.MessageEmbed()
            .setDescription(description)
            return message.channel.send(embed)
        }
        
        let bals = await db.fetch(`bal_${message.author.id}`) || 0
        let q = args[0]
        const a = q * 2
        var slots = [
        "<:eggplant:815211593994338314>",
        "<:cherry:815211621000675358>",
        "<:heart:815211633604558858>",
        "<:cherry:815211621000675358>",
        "<:eggplant:815211593994338314>",
        "<:eggplant:815211593994338314>"
        ]

        var slot1 = slots[Math.floor(Math.random() * slots.length)];
        var slot2 = slots[Math.floor(Math.random() * slots.length)];
        var slot3 = slots[Math.floor(Math.random() * slots.length)];

        if(!q) {
            return embed(`${client.emotes.error} | Please specify a number for play slot!`)
        } else {
            if(isNaN(q)) {
                return embed(`${client.emotes.error} | This is not a number.`)
            } else {
                if(q.includes("-")) {
                    return message.channel.send(`${client.emotes.error} | Bruh.`)
                } else {
            if(q > bals) {
                return embed(`${client.emotes.error} | You dont have enough balance! You currently have **${bals ? "0" : bals}** money.`)
            } else {
                if(slot1 === slot2 && slot1 === slot3) {
                    message.channel.send(stripIndents`
                    ${slot1} : ${slot2} : ${slot3}

                    You won! You got **${a}** money!
                    `)
                    await db.add(`bal_${message.author.id}`, a)
                    await db.set(`slot.cool_${message.author.id}`, Date.now())
                } 
                
                else {
                    message.channel.send(stripIndents`
                    ${slot1} : ${slot2} : ${slot3}

                    You lose! You loss your **${q}** money!
                    `)
                    await db.substr(`bal_${message.author.id}`, q)
                    await db.set(`slot.cool_${message.author.id}`, Date.now())
                }
            }
        }
    }
        }}
    }}