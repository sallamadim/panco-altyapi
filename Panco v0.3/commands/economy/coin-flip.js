const Discord = require('discord.js')
const ms = require('parse-ms')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "coin-flip",
    aliases: ["cf", "coinflip"],
/**
* @param {Discord.Message} message
* @param {Discord.Client} client
* @param {String[]} args
*/
    run: async (client, message, args) => {
        let cool = 30000

        let last = await db.fetch(`coin.cool_${message.author.id}`)
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

        const bals = await db.fetch(`bal_${message.author.id}`)
        const q = args[0]
        const a = q * 2
        var array = [
            `You won! You got **${a}** money!`,
            `You won! You got **${a}** money!`,
            `You won! You got **${a}** money!`,
            `You lose! You have loss your **${q}** money!`
        ]
        var gay = array[Math.floor(Math.random() * array.length)]
        if(!q) {
            return embed(`${client.emotes.error} | Specify a money.`)
        } else {
            if(isNaN(q)) {
                return embed(`${client.emotes.error} | This is not a number.`)
            } else {
                if(q.includes("-")) {
                    return message.channel.send(`${client.emotes.error} | Bruh.`)
                } else {
                if(q > bals) {
                    return embed(`${client.emotes.error} | You dont have enough money. **${q}**/**${bals}**`)
                } else {
                    message.channel.send(`${client.emotes.coin} | Spinning coin..`)
                    .then(msg => {
                        setTimeout(async () =>{
                            msg.edit(`${client.emotes.coin} | Spinning coin...`).then(async msg => {
                                if(gay == array[0] && gay == array[1] && gay == array[2]) {
                                    msg.edit(`${client.emotes.success} | ${array[0]}`)
                                    await db.add(`bal_${message.author.id}`, a) 
                                    await db.set(`coin.cool_${message.author.id}`, Date.now())
                                } else {
                                    if(gay == array[3]) {
                                        msg.edit(`${client.emotes.error} | ${array[1]}`)
                                        await db.substr(`bal_${message.author.id}`, q)
                                        await db.set(`coin.cool_${message.author.id}`, Date.now())
                                    }
                                }
                        })
                        }, 5000)
                    })
                }
            }
        }}
    }

    },
}