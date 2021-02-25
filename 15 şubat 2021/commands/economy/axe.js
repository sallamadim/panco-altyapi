
const discord = require('discord.js')
const ms = require('parse-ms')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "axe",
    aliases: [],
    run: async (client, message, args) => {
let axe = await db.fetch(`axe_${message.author.id}`)
let dura = await db.fetch(`axedura_${message.author.id}`)

if(!await db.has(`axe_${message.author.id}`)){
    message.channel.send(new discord.MessageEmbed().setDescription(`
${client.emotes.error} | You dont have an axe.    
    `))
} else {
let cooldown = 3600000

let lastDaily = await db.fetch(`axesüre_${message.author.id}`);
if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
    let timeObj = ms(cooldown - (Date.now() - lastDaily));

    return message.channel.send(new discord.MessageEmbed().setDescription(`
${client.emotes.error} | You need to wait; **${timeObj.hours}** hours, **${timeObj.minutes}** minutes, **${timeObj.seconds}** seconds.
    `))

} else {
var a = [
    `${client.emotes.success} | You got \`2\` woods,\nand your axe's durability was reduced \`5\`.`,
    `${client.emotes.success} | You got \`3\` woods,\nand your axe's durability was reduced \`4\`.`,
    `${client.emotes.success} | You got \`1\` woods,\nand your axe's durability was reduced \`3\`.`,
    `${client.emotes.success} | You got \`4\` woods,\nand your axe's durability was reduced \`6\`.`
]
var b = a[Math.floor(Math.random()*a.length)]

if(b == a[0]){
message.channel.send(new discord.MessageEmbed().setDescription(`
${a[0]} 
`))
await db.add(`stick_${message.author.id}`, 2)
await db.substr(`axedura_${message.author.id}`, 5)
await db.set(`axesüre_${message.author.id}`, Date.now())
await db.add(`axe.puan_${message.author.id}`, 1)
}
if(b == a[1]){
    message.channel.send(new discord.MessageEmbed().setDescription(`
    ${a[1]} 
    `))
    await db.add(`stick_${message.author.id}`, 3)
    await db.substr(`axedura_${message.author.id}`, 4)
    await db.set(`axesüre_${message.author.id}`, Date.now())
    await db.add(`axe.puan_${message.author.id}`, 1)
    }
    if(b == a[2]){
        message.channel.send(new discord.MessageEmbed().setDescription(`
        ${a[2]} 
        `))
        await db.add(`stick_${message.author.id}`, 2)
        await db.substr(`axedura_${message.author.id}`, 5)
        await db.set(`axesüre_${message.author.id}`, Date.now())
        await db.add(`axe.puan_${message.author.id}`, 1)
        }
        if(b == a[3]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${a[3]} 
            `))
            await db.add(`stick_${message.author.id}`, 1)
            await db.substr(`axedura_${message.author.id}`, 3)
            await db.set(`axesüre_${message.author.id}`, Date.now())
            await db.add(`axe.puan_${message.author.id}`, 1)
            }
if(dura < 1){
    await db.delete(`axe_${message.author.id}`)
    await db.delete(`axedura_${message.author.id}`)
    message.reply(`${client.emotes.error} | Your axe's has been breaked.\nBecause your axe's durability was lower than 0.`)
}
    
} 
}
    }}