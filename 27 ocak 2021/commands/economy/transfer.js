const discord = require('discord.js')
const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "transfer",
    aliases: [],
    run: async (client, message, args) => {  
    let bal = await db.fetch(`iron_${message.author.id}`)
    let bal2 = await db.fetch(`gold_${message.author.id}`)
    let bal3 = await db.fetch(`diamond_${message.author.id}`)
    let bal4 = await db.fetch(`emerald_${message.author.id}`)

    let carp = await db.fetch(`carp_${message.author.id}`)
    let walleye = await db.fetch(`walleye_${message.author.id}`)
    let pike = await db.fetch(`pike_${message.author.id}`)
    let blueg = await db.fetch(`blueg_${message.author.id}`)
    let bluef = await db.fetch(`bluef_${message.author.id}`)

    let user = message.mentions.users.first()
    let secim = args[1]
    let secim2 = args[2]
    
    if(!user) return message.channel.send(new discord.MessageEmbed().setDescription(`You dont mention a user!`))
    if(user.bot) return message.channel.send(new discord.MessageEmbed().setDescription(`Why you trying to give a thing for a bot?`))
    if(user.id == message.author.id) return message.channel.send(new discord.MessageEmbed().setDescription(`Only you are smart.`))
    if(!secim) return message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | Please specify a thing.

    Example use:

    \`panco transfer @sallamadım#0031\`
                         
                    Mention a user first.

    \`panco transfer @sallamadım#0031 diamond\`
                                      
                                     Specify a thing. (diamond,gold,iron,emerald) etc. (and fishes too).

    \`panco transfer @sallamadım#0031 diamond 10\`
                                              
                                              An amount.                                 
    `))
    if(secim == "iron"){
        if(!secim2)return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | Specify a amount.`))
        if(isNaN(secim2)) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | This is not a number.`))
        if(secim2 > bal) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | You dont have enough irons.`))
        else if(secim2){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | You succesfully give ${secim2} irons to ${user}.
            `))
            await db.add(`iron_${user.id}`, secim2)
            await db.substr(`iron_${message.author.id}`, secim2)
        }
    }
    else if(secim == "gold"){
        if(!secim2)return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | Specify a amount.`))
        if(isNaN(secim2)) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | This is not a number.`))
        if(secim2 > bal2) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | You dont have enough golds.`))   
        else if(secim2){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | You succesfully give ${secim2} golds to ${user}.
            `))
            await db.add(`gold_${user.id}`, secim2)
            await db.substr(`gold_${message.author.id}`, secim2)
        }
    }
    else if(secim == "diamond"){
        if(!secim2)return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | Specify a amount.`))
        if(isNaN(secim2)) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | This is not a number.`))
        if(secim2 > bal3) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | You dont have enough diamonds.`))   
        else if(secim2){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | You succesfully give ${secim2} diamonds to ${user}.
            `))
            await db.add(`diamond_${user.id}`, secim2)
            await db.substr(`diamond_${message.author.id}`, secim2)
        }
    }
    else if(secim == "emerald"){
        if(!secim2)return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | Specify a amount.`))
        if(isNaN(secim2)) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | This is not a number.`))
        if(secim2 > bal4) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | You dont have enough emeralds.`))   
        else if(secim2){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | You succesfully give ${secim2} emeralds to ${user}.
            `))
            await db.add(`emerald_${user.id}`, secim2)
            await db.substr(`emerald_${message.author.id}`, secim2)
        }
    }
    else if(secim == "carp"){
        if(!secim2)return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | Specify a amount.`))
        if(isNaN(secim2)) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | This is not a number.`))
        if(secim2 > carp) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | You dont have enough carps.`))   
        else if(secim2){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | You succesfully give ${secim2} carps to ${user}.
            `))
            await db.add(`carp_${user.id}`, secim2)
            await db.substr(`carp_${message.author.id}`, secim2)
        }
    }
    else if(secim == "walleye"){
        if(!secim2)return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | Specify a amount.`))
        if(isNaN(secim2)) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | This is not a number.`))
        if(secim2 > walleye) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | You dont have enough walleyes.`))   
        else if(secim2){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | You succesfully give ${secim2} wall eyes to ${user}.
            `))
            await db.add(`walleye_${user.id}`, secim2)
            await db.substr(`walleye_${message.author.id}`, secim2)
        }
    }
    else if(secim == "pike"){
        if(!secim2)return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | Specify a amount.`))
        if(isNaN(secim2)) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | This is not a number.`))
        if(secim2 > pike) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | You dont have enough pikes.`))   
        else if(secim2){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | You succesfully give ${secim2} pikes to ${user}.
            `))
            await db.add(`pike_${user.id}`, secim2)
            await db.substr(`pike_${message.author.id}`, secim2)
        }
    }
    else if(secim == "bluegill"){
        if(!secim2)return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | Specify a amount.`))
        if(isNaN(secim2)) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | This is not a number.`))
        if(secim2 > blueg) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | You dont have enough bluegills.`))   
        else if(secim2){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | You succesfully give ${secim2} bluegills to ${user}.
            `))
            await db.add(`blueg_${user.id}`, secim2)
            await db.substr(`blueg_${message.author.id}`, secim2)
        }
    }
    else if(secim == "bluefish"){
        if(!secim2)return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | Specify a amount.`))
        if(isNaN(secim2)) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | This is not a number.`))
        if(secim2 > bluef) return message.channel.send(new discord.MessageEmbed().setDescription(`${client.emotes.error} | You dont have enough bluefishes.`))   
        else if(secim2){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.success} | You succesfully give ${secim2} bluefishes to ${user}.
            `))
            await db.add(`bluef_${user.id}`, secim2)
            await db.substr(`bluef_${message.author.id}`, secim2)
        }
    }
    },
};