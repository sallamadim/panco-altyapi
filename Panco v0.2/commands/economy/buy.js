

const dc=require('discord.js')
const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "buy",
    aliases: [],
    run: async (client, message, args) => {  
    let bal = await db.fetch(`iron_${message.author.id}`)
    let bal2 = await db.fetch(`gold_${message.author.id}`)
    let bal3 = await db.fetch(`diamond_${message.author.id}`)
    let bal4 = await db.fetch(`emerald_${message.author.id}`)

    if(bal == null || undefined)bal = "0";
if(bal2 == null || undefined)bal2 = "0";
if(bal3 == null || undefined)bal3 = "0";
if(bal4 == null || undefined)bal4 = "0";
let a = args[1]

if(!args[0]){
    message.channel.send(new dc.MessageEmbed().setDescription(`
\`\`\`Welcome to buy commands help!\`\`\`

**To see what can you buy type: \`shop\`** 

> If you cannot buy anything contact with my owner.
> sallamadım#0031



    `));
    
}
let goldmoney2 = Number(a*40)
if(args[0] == "gold"){
if(!a){
    message.channel.send(new dc.MessageEmbed().setDescription(`
    ${client.emotes.error} | Please specify a amount.
    `))
}
else {
    if(bal < goldmoney2){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have enough irons.
        `))
    }
else{
    if(isNaN(a)){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | It's not a number bitches.
        `))
    }
    else {
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.success} | You succesfully bought ${a} golds for ${goldmoney2} irons.
        `))
        await db.substr(`iron_${message.author.id}`, goldmoney2)
        await db.add(`gold_${message.author.id}`, a)
    }
    }
}

}
else {
    let dmoney2 = Number(a*32)
    if(args[0] == "diamond"){
if(!a){
    message.channel.send(new dc.MessageEmbed().setDescription(`
    ${client.emotes.error} | Please specify a number.
    `))
}
else {
    if(isNaN(a)){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | It's not a number bitches.
        `))
    }else{
        if(bal2 < dmoney2){
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | You dont have enough golds.
            `))
        }
        else {
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.success} | You have bought ${a} diamonds for ${dmoney2} golds.
            `))
            await db.substr(`gold_${message.author.id}`, dmoney2)
            await db.add(`diamond_${message.author.id}`, a)
        }
    }
}

}

let emerald = Number(a*64)
if(args[0] == "emerald"){
if(!a){
message.channel.send(new dc.MessageEmbed().setDescription(`
${client.emotes.error} | Please specify a number.
`))
}
else {
if(isNaN(a)){
    message.channel.send(new dc.MessageEmbed().setDescription(`
    ${client.emotes.error} | It's not a number bitches.
    `))
}else{
    if(bal2 < emerald){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have enough diamonds.
        `))
    }
    else {
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.success} | You have bought ${a} golds for ${emerald} diamonds.
        `))
        await db.substr(`diamond_${message.author.id}`, emerald)
        await db.add(`emerald_${message.author.id}`, a)
    }
}
}

}

            else {
if(args[0] == "sword"){
    let dura = await db.fetch(`sworddura_${message.author.id}`)
    if(await db.has(`sword_${message.author.id}`, 'acik')){
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | You already have a sword btw.
        `))
    } else {
        await db.fetch(`sword_${message.author.id}`)
    if(bal < 50){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have enought irons.
        `))
    } else {
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.success} | You have bough a sword for **50** irons.\nSword has **50** durability.\nYou can use it with: **panco sword**
        `))
        await db.substr(`iron_${message.author.id}`, 50)
        await db.set(`sword_${message.author.id}`, 'acik')
        await  db.set(`sworddura_${message.author.id}`, 50)
    }
    }
} else {

if(args[0] == "fishing-rod"){
    let fsd = await db.fetch(`roddura_${message.author.id}`)
    let fs = await db.fetch(`rod_${message.author.id}`)
    if(await db.has(`rod_${message.author.id}`, 'acik')){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You already have a rod.
        `))
    }else {
        let string = await db.fetch(`string_${message.author.id}`)
        let stick = await db.fetch(`stick_${message.author.id}`)

        if(string < 2){
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | You dont have enought string.
            `))
        } else {
            if(stick < 3){
                message.channel.send(new dc.MessageEmbed().setDescription(`
                ${client.emotes.error} | You dont have enought stick.
                    `))
            } else {
                message.channel.send(new dc.MessageEmbed().setDescription(`
                ${client.emotes.success} | You have bough a **fishing rod** for **2** string and **3** stick.\nFishing rod has **20** durability.\nYou can use it with: **panco rod**. 
                `))
                await db.set(`rod_${message.author.id}`, 'acik')
                await db.set(`roddura_${message.author.id}`, 20)
                await db.substr(`string_${message.author.id}`, 2)
                await db.substr(`stick_${message.author.id}`, 3)
            }
        }
    }
}else {
    if(args[0] === "axe"){
        await db.fetch(`axedura_${message.author.id}`)
        if(await db.has(`axe_${message.author.id}`, 'acik')){
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | You already have an axe.
            `))
        } else {
        let axe = await db.fetch(`axe_${message.author.id}`)
        if(bal < 30){
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | You dont have enought irons.
            `))
        } else {
            message.channel.send(new dc.MessageEmbed().setDescription(`
            You have bough an **axe** for **30** irons.\nAxe has **60** durability.\nYou can use it with: **panco axe**
            `))
            await db.set(`axe_${message.author.id}`, 'acik')
            await db.set(`axedura_${message.author.id}`, 60)
            await db.substr(`iron_${message.author.id}`, 30)
        }
    }
}
}



}
}
}
}
}