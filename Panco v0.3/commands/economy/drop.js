const Discord = require('discord.js')

const ms = require('parse-ms')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "drop",
    aliases: [],
/** 
* @param {Discord.Client} client
* @param {Discord.Message} message
* @param {String[]} args
*/
    run: async (client, message, args) => {
let cool = 60000

let last = await db.fetch(`drop.cool_${message.author.id}`)
if(last !== null && cool - (Date.now() - last) > 0) {
    let time = ms(cool - (Date.now() - last))

    const embed = new Discord.MessageEmbed()
    .addField(`${client.emotes.error} | To use this command you need to wait; `, `
    **${time.minutes}** minutes, **${time.seconds}** seconds.`)

    message.channel.send(embed)


} else {
    const w = args[0]
    const bal = await db.fetch(`bal_${message.author.id}`)
    const a = w * 3
    let system1 = await db.fetch(`drop_${message.channel.id}`)
    if(!w) return message.channel.send(`${client.emotes.error} | Specify a money for drop!`)
    else {
        if(isNaN(w)) {
            return message.channel.send(`${client.emotes.error} | Thats not a number.`)
        } else {
            if(w > bal) {
                return message.channel.send(`${client.emotes.error} | You dont have enough money.`)
            } else {
                if(w.includes("-")) {
                    return message.channel.send(`${client.emotes.error} | Bruh.`)
                } else {
                    await db.add(`drop_${message.channel.id}`, w)
                    await db.substr(`bal_${message.author.id}`, w)
                    await db.set(`drop.cool_${message.author.id}`, Date.now())
                    return message.channel.send(`${client.emotes.success} | Dropped!`)
                    
                }
            }
        }
    }
}
    },
}