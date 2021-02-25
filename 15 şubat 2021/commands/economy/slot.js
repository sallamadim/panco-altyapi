
const { MessageEmbed, Message } = require('discord.js')

const { stripIndents, stripIndent } = require('common-tags')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")

var slots = ["🍇", "🍑", "🍅", "🍇", "🍇", "🍅"]
module.exports = {
    name: "slot",
    aliases: [],
    run: async (client, message, args) => {
        let bal = await db.fetch(`iron_${message.author.id}`)
        let bal2 = await db.fetch(`gold_${message.author.id}`)
        let bal3 =await  db.fetch(`diamond_${message.author.id}`)
        let bal4 =await  db.fetch(`emerald_${message.author.id}`)

        let secim = args[0]
        let sayi = args[1]

        var slot1 = slots[Math.floor(Math.random() * slots.length)];
        var slot2 = slots[Math.floor(Math.random() * slots.length)];
        var slot3 = slots[Math.floor(Math.random() * slots.length)];
        

        if(!secim) { return message.channel.send(new MessageEmbed().setDescription(`
        ${client.emotes.error} | You didnt specify a valid mineral. (diamond, gold, emerald, iron supported)
        `)) } else {
            if(!sayi) { return message.channel.send(new MessageEmbed().setDescription(`
            ${client.emotes.error} | You didnt specify a valid number.
            `)) } else {
                if(isNaN(sayi)) {
                    return message.channel.send(new MessageEmbed().setDescription(`
                    ${client.emotes.error} | This is not a number.
                    `))
                } else {
                    if(secim == "iron") {
                        if(sayi > bal) {
                            return message.channel.send(`${client.emotes.error} | You dont have enough irons.`)
                        } else {
                            if(slot1 === slot2 && slot1 === slot3) {
                                message.channel.send(stripIndents`
                                ${slot1} : ${slot2} : ${slot3}

                                <a:cekilis:797071398878183464> You have won! And you got ${sayi * 2} irons! 
                                `)
                                await db.add(`iron_${message.author.id}`, sayi * 2)
                            } else {
                                message.channel.send(stripIndents`
                                ${slot1} : ${slot2} : ${slot3}

                                <a:random:796347899125825566> You lose! And you have loss your ${sayi * 2} irons.
                                `)
                                await db.substr(`iron_${message.author.id}`, sayi * 2)
                            }
                        }
                    } else {
                        if(secim == "gold") {
                            if(sayi > bal2) {
                                return message.channel.send(`${client.emotes.error} | You dont have enough golds.`)
                            } else {
                                if(slot1 === slot2 && slot1 === slot3) {
                                    message.channel.send(stripIndents`
                                    ${slot1} : ${slot2} : ${slot3}
    
                                    <a:cekilis:797071398878183464> You have won! And you got ${sayi * 2} golds! 
                                    `)
                                    await db.add(`gold_${message.author.id}`, sayi * 2)
                                } else {
                                    message.channel.send(stripIndents`
                                    ${slot1} : ${slot2} : ${slot3}
    
                                    <a:random:796347899125825566> You lose! And you have loss your ${sayi * 2} golds.
                                    `)
                                    await db.substr(`gold_${message.author.id}`, sayi * 2)
                                }
                            }
                        } else {
                            if(secim == "diamond") {
                            if(sayi > bal3) {
                                return message.channel.send(`${client.emotes.error} | You dont have enough diamonds.`)
                                } else {
                                    if(slot1 === slot2 && slot1 === slot3) {
                                        message.channel.send(stripIndents`
                                        ${slot1} : ${slot2} : ${slot3}
        
                                        <a:cekilis:797071398878183464> You have won! And you got ${sayi * 2} diamonds! 
                                        `)
                                        await db.add(`diamond_${message.author.id}`, sayi * 2)
                                    } else {
                                        message.channel.send(stripIndents`
                                        ${slot1} : ${slot2} : ${slot3}
        
                                        <a:random:796347899125825566> You lose! And you have loss your ${sayi * 2} diamonds.
                                        `)
                                        await db.substr(`diamond_${message.author.id}`, sayi * 2)
                                    }
                                }
                            } else {
                                if(secim == "emerald") {
                                    if(sayi > bal4) {
                                        return message.channel.send(`${client.emotes.error} | You dont have enough emeralds.`)
                                    } else {
                                        if(slot1 === slot2 && slot1 === slot3) {
                                            message.channel.send(stripIndents`
                                            ${slot1} : ${slot2} : ${slot3}
            
                                            <a:cekilis:797071398878183464> You have won! And you got ${sayi * 2} emeralds! 
                                            `)
                                            await db.add(`emerald_${message.author.id}`, sayi * 2)
                                        } else {
                                            message.channel.send(stripIndents`
                                            ${slot1} : ${slot2} : ${slot3}
            
                                            <a:random:796347899125825566> You lose! And you have loss your ${sayi * 2} emeralds.
                                            `)
                                            await db.substr(`emerald_${message.author.id}`, sayi * 2)
                                        }
                                    }
                                }  
                            }   
                        }
                    }
                }
            }
        }
    },
}