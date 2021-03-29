
const discord = require('discord.js')
const ms=require('parse-ms')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "sword",
    aliases: [],
    run: async (client, message, args) => {

    let sword = await db.fetch(`sword_${message.author.id}`)
    let dura = await db.fetch(`sworddura_${message.author.id}`)

    if(!await db.has(`sword_${message.author.id}`)){
        message.channel.send(new discord.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have an axe.
        
        `))
    } else {
    let cooldown = 3600000

    let lastDaily = await db.fetch(`swordsüre_${message.author.id}`);
    if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));

        return message.channel.send(new discord.MessageEmbed().setDescription(`
        ${client.emotes.error} | To use this command again you need to wait; ${timeObj.hours} hour(s), ${timeObj.minutes} minute(s), ${timeObj.seconds} second(s).
        `))
    
    } else {
var array = [
    "You have killed `4` spider, and got `3` strings.\nBut your sword durability reduced `3`.",
    "You have killed `1` spider, and got `2` strings.\nBut your sword durability reduced `5`.",
    "You have killed `2` spider, and got `4` strings.\nBut your sword durability reduced `4`.",
    "You have killed `3` spider, and got `3` strings.\nBut your sword durability reduced `2`."
]
var a = array[Math.floor(Math.random()*array.length)]

if(a == array[0]){
    message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.success} | ${array[0]}
    `))
    await db.substr(`sworddura_${message.author.id}`, 3)
    await db.add(`string_${message.author.id}`, 3)
    await db.set(`swordsüre_${message.author.id}`, Date.now())
    await db.add(`sword.puan_${message.author.id}`, 1)
}

if(a == array[1]){
    message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.success} | ${array[1]}
    `))
    await db.substr(`sworddura_${message.author.id}`, 5)
    await db.add(`string_${message.author.id}`, 2)
    await db.set(`swordsüre_${message.author.id}`, Date.now())
    await db.add(`sword.puan_${message.author.id}`, 1)
}

if(a == array[2]){
    message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.success} | ${array[2]}
    `))
    await db.substr(`sworddura_${message.author.id}`, 4)
    await db.add(`string_${message.author.id}`, 4)
    await db.set(`swordsüre_${message.author.id}`, Date.now())
    await db.add(`sword.puan_${message.author.id}`, 1)
}

if(a == array[3]){
    message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.success} | ${array[3]}
    `))
    await db.substr(`sworddura_${message.author.id}`, 3)
    await db.add(`string_${message.author.id}`, 2)
    await db.set(`swordsüre_${message.author.id}`, Date.now())
    await db.add(`sword.puan_${message.author.id}`, 1)
}

if(dura < 1){

    message.reply(new discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | Your sword has been breaked due dont have enough durability.
    `))
    await db.delete(`sword_${message.author.id}`)
    await db.delete(`sworddura_${message.author.id}`)
}
     
    } 
    }
}
}