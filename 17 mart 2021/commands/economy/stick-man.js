const Discord = require('discord.js')

const ms = require('parse-ms')
const { stripIndents } = require('common-tags')
const words = require('../../config/words.json')
const oyndurum = new Set()

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "stick-man",
    aliases: ["stickman"],
/** 
* @param {Discord.Client} client
* @param {Discord.Message} message
* @param {String[]} args
*/
    run: async (client, message, args) => {
        let cool = 180000

        let last = await db.fetch(`stick.cool_${message.author.id}`)
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
            if(!w) return message.channel.send(`${client.emotes.error} | Specify a money for play!`)
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

            if(oyndurum.has(message.channel.id)){ return message.reply(`${client.emotes.error} | Only one game can play in one channel.`)
        } else {
            try {
                const cevap =   words[Math.floor(Math.random() * words.length)].toLowerCase()
                var point = 0;
                var displayText = null;
                var tahmin = false;
                const confirmation = [];
                const yanlış = []
                const display = new Array(cevap.length).fill("_")
                while (cevap.length !== confirmation.length && point < 6) {
                    await message.channel.send(stripIndents`
                    ${displayText === null ? 'Stick Man!' : displayText ? `${client.emotes.success} | Nice!` : `${client.emotes.error} | Oh, wrong letter!`}
                         Word: \`${display.join(' ')}\`

                    Wrong letters; \`${yanlış.join(" , ") || "Nothing."}\`
                    \`\`\`
                    _________
                    |    |
                    |    ${point > 0 ? '' : ''}
                    |   ${point > 2 ? '┌' : ' '}${point > 1 ? '😄' : ''}${point > 3 ? '┐' : ''}
                    |    ${point > 4 ? '/' : ''} ${point > 5 ? '\\' : ''}
                    |
                    \`\`\`
                    `)
                    const filter = res => {
                        const choice = res.content.toLowerCase()
                        return res.author.id === message.author.id && !confirmation.includes(choice) && !yanlış.includes(choice)
                    }
                    const guess = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 300000
                    })
                    if(!guess.size) {
                        await message.channel.send(`${client.emotes.error} | Time's up!`)
                        break;
                    }
                    const choice = guess.first().content.toLowerCase()
                    if(choice === "end")break;
                    if(choice.length > 1 && choice === cevap) {
                        tahmin = true;
                        break;
                    } else 
                        if(cevap.includes(choice)) {
                            displayText = true;
                            for (var i = 0; i < cevap.length; i++) {
                                if(cevap.charAt(i) !== choice) continue;
                                confirmation.push(cevap.charAt(i))
                                display[i] = cevap.charAt(i)
                            }
                        }  else {
                            displayText = false;
                            if(choice.length === 1) yanlış.push(choice)
                            point++;
                        }
                }
                oyndurum.delete(message.channel.id)
                if(cevap.length === confirmation.length || tahmin)
                {
                    message.channel.send(`${client.emotes.success} | You won! Word is **${cevap}**!`)
                    await db.add(`bal_${message.author.id}`, a)
                    await db.set(`stick.cool_${message.author.id}`, Date.now())

                }else
                {    
                
                    message.channel.send(`${client.emotes.error} | You loss! Word is: **${cevap}**!`)
                    await db.substr(`bal_${message.author.id}`, w)
                    await db.set(`stick.cool_${message.author.id}`, Date.now())
                }
            } catch (err) {
                oyndurum.delete(message.channel.id)
                return message.channel.send(`${client.emotes.error} | Got an error:`)
                .then(msg => {
                    msg.channel.send(err)
                })
            }
        }
    }
}
            }
        }
    }
    },
}