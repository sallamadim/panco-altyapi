
const discord = require('discord.js')
const ms=require('parse-ms')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const  db = new Database(mongo,"pancodb")
module.exports = {
    name: "rod",
    aliases: [],
    run: async (client, message, args) => {

    let rod = await db.fetch(`rod_${message.author.id}`)
    let dura = await db.fetch(`roddura_${message.author.id}`)
    let asd = await db.fetch(`rod.puan_${message.author.id}`)
    let carp = await db.fetch(`carp_${message.author.id}`)
    let walleye = await db.fetch(`walleye_${message.author.id}`)
    let pike = await db.fetch(`pike_${message.author.id}`)
    let blueg = await db.fetch(`blueg_${message.author.id}`)
    let bluef = await db.fetch(`bluef_${message.author.id}`)


    if(!await db.has(`rod_${message.author.id}`)){
        message.channel.send(new discord.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have an fishing rod.
        
        `))
    } else {
    let cooldown = 3600000

    let lastDaily = await db.fetch(`rodsüre_${message.author.id}`);
    if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));

        return message.channel.send(new discord.MessageEmbed().setDescription(`
        ${client.emotes.error} | You need to wait; ${timeObj.hours} hour(s), ${timeObj.minutes} minute(s), ${timeObj.seconds} second(s).\nTo use this command again.
        `))
    
    } else {
        var carp_array = [
            "You have catch a **carp**.\nYour rod's durability reduced `3`.",
            "You have catch a `2` **carp**.\nYour rod's durability reduced `5`."
        ]
        var walleye_array = [
            "You have catch a **walleye**.\nYour rod's durability reduced `3`.",
            "You have catch a `2` **walleye**.\nYour rod's durability reduced `7`."
        ]
        var pike_array = [
            "You have catch a **pike**.\nYour rod's durability reduced `2`.",
            "You have catch a `2` **pike**.\nYour rod's durability reduced `4`."
        ]
        var bluegill_array = [
            "You have catch a **blue gill**.\nYour rod's durability reduced `3`.",
            "You have catch a `2` **blue gill**.\nYour rod's durability reduced `4`."
        ]
        var bluefish_array = [
            "You have catch a **blue fish**.\nYour rod's durability reduced `5`.",
            "You have catch a `2` **blue fish**.\nYour rod's durability reduced `7`."
        ]
        var d = carp_array.concat(walleye_array).concat(pike_array).concat(bluegill_array).concat(bluefish_array)
        var a = d[Math.floor(Math.random()*d.length)]

        //carp
        if(a == d[0]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[0]}
            `))
            await db.add(`carp_${message.author.id}`, 1)
            await db.substr(`roddura_${message.author.id}`, 3)
            await db.set(`rodsüre_${message.author.id}`, Date.now())
            await db.add(`rod.puan_${message.author.id}`, 1)
        }
        if(a == d[1]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[1]}
            `))
            await db.add(`carp_${message.author.id}`, 2)
            await db.substr(`roddura_${message.author.id}`, 5)
            await db.set(`rodsüre_${message.author.id}`, Date.now())
            await db.add(`rod.puan_${message.author.id}`, 1)
        }
        //walleye
        if(a == d[2]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[2]}
            `))
            await db.add(`walleye_${message.author.id}`, 1)
            await db.substr(`roddura_${message.author.id}`, 3)
            await db.set(`rodsüre_${message.author.id}`, Date.now())
            await db.add(`rod.puan_${message.author.id}`, 1)
        }
        if(a == d[3]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[3]}
            `))
            await db.add(`walleye_${message.author.id}`, 2)
            await db.substr(`roddura_${message.author.id}`, 7)
            await db.set(`rodsüre_${message.author.id}`, Date.now())
            await db.add(`rod.puan_${message.author.id}`, 1)
        }
        //pike
        if(a == d[4]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[4]}
            `))
            await db.add(`pike_${message.author.id}`, 1)
            await db.substr(`roddura_${message.author.id}`, 2)
            await db.set(`rodsüre_${message.author.id}`, Date.now())
            await db.add(`rod.puan_${message.author.id}`, 1)
        }
        if(a == d[5]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[5]}
            `))
            await db.add(`pike_${message.author.id}`, 2)
            await db.substr(`roddura_${message.author.id}`, 4)
            await db.set(`rodsüre_${message.author.id}`, Date.now())
            await db.add(`rod.puan_${message.author.id}`, 1)
        }
        //blue gill
        if(a == d[6]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[6]}
            `))
            await db.add(`blueg_${message.author.id}`, 1)
            await db.substr(`roddura_${message.author.id}`, 3)
            await db.set(`rodsüre_${message.author.id}`, Date.now())
            await db.add(`rod.puan_${message.author.id}`, 1)
        }
        if(a == d[7]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[7]}
            `))
            await db.add(`walleye_${message.author.id}`, 2)
            await db.substr(`roddura_${message.author.id}`, 4)
            await db.set(`rodsüre_${message.author.id}`, Date.now())
            await db.add(`rod.puan_${message.author.id}`, 1)    
        }
        //blue fish bune mk 
        if(a == d[8]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[8]}
            `))
            await db.add(`bluef_${message.author.id}`, 1)
            await db.substr(`roddura_${message.author.id}`, 5)
            await  db.set(`rodsüre_${message.author.id}`, Date.now()) //7
            await db.add(`rod.puan_${message.author.id}`, 1)
        }
        if(a == d[9]){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | ${d[9]}
            `))
            await db.add(`bluef_${message.author.id}`, 2)
            await db.substr(`roddura_${message.author.id}`, 7)
            await db.set(`rodsüre_${message.author.id}`, Date.now()) //7
            await db.add(`rod.puan_${message.author.id}`, 1)
        }
if(dura < 1){
    message.reply(`${client.emotes.error} | Your rod has been breaked due not enough durability.`)
    await db.delete(`rod_${message.author.id}`)
    await db.delete(`roddura_${message.author.id}`)
}    

    } 
    }


}
}