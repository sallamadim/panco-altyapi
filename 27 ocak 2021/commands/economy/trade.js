
const dc=require('discord.js')
const { description } = require("./store")

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "trade",
    aliases: [],
    run: async (client, message, args) => {

    let carp = await db.fetch(`carp_${message.author.id}`)
    let walleye = await db.fetch(`walleye_${message.author.id}`)
    let pike = await db.fetch(`pike_${message.author.id}`)
    let blueg = await db.fetch(`blueg_${message.author.id}`)
    let bluef = await db.fetch(`bluef_${message.author.id}`)
    let args1 = args[0]
    let args2 = args[1]
    
    let para = Number(args2) * 2
    let para2 = Number(args2) * 3
    let para3 = Number(args2) * 4
    let para4 = Number(args2) * 4
    let para5 = Number(args2) * 2

    if(!args1){
    message.channel.send(new dc.MessageEmbed().setDescription(`
    ${client.emotes.error} | You didnt provide enough arguments.
    `))
}
else {

    if(args1 === "carp"){
        if(!args2){
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | You didnt write a number for trade.
            `))
        }else{
        if(args2 > carp){
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | You dont have enought carps.
            `))
        }
        else {
        if(isNaN(args2)) {
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | This is not a number.
            `))
        }
        else {
        if(args2 > 64){
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | You can sell maximum 64!
            `))
        }
        else {
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.success} | You have sold ${args2} carps for ${para} iron.
        `))
        db.add(`iron_${message.author.id}`, para)
        db.subtract(`carp_${message.author.id}`, args2)
        }
    }
}
        }
}

if(args1 === "walleye"){
    if(!args2){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You didnt write a number for trade.
        `))
    }else{
    if(args2 > walleye){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have enought carps.
        `))
    }
    else {
        if(isNaN(args2)) {
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | This is not a number.
            `))
        }
    else {
    if(args2 > 64){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You can sell maximum 64!
        `))
    }
    else {
    message.channel.send(new dc.MessageEmbed().setDescription(`
    ${client.emotes.success} | You have sold ${args2} walleyes for ${para2} iron.
    `))
    db.add(`iron_${message.author.id}`, para2)
    db.subtract(`walleye_${message.author.id}`, args2)
    }
}
}
    }
}
if(args1 === "pike"){
    if(!args2){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You didnt write a number for trade.
        `))
    }else{
    if(args2 > pike){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have enought pikes.
        `))
    }
    else {
        if(isNaN(args2)) {
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | This is not a number.
            `))
        }
    else {
    if(args2 > 64){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You can sell maximum 64!
        `))
    }
    else {
    message.channel.send(new dc.MessageEmbed().setDescription(`
    ${client.emotes.success} | You have sold ${args2} pikes for ${para3} iron.
    `))
    db.add(`iron_${message.author.id}`, para3)
    db.subtract(`pike_${message.author.id}`, args2)
    }
}
}}
}

if(args1 === "bluegill"){
    if(!args2){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You didnt write a number for trade.
        `))
    }else{
    if(args2 > blueg){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have enought bluegills.
        `))
    }
    else {
        if(isNaN(args2)) {
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | This is not a number.
            `))
        }
    else {

    if(args2 > 64){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You can sell maximum 64!
        `))
    }
    else {
    message.channel.send(new dc.MessageEmbed().setDescription(`
    ${client.emotes.success} | You have sold ${args2} bluegills for ${para4} iron.
    `))
    db.add(`iron_${message.author.id}`, para4)
    db.subtract(`blueg_${message.author.id}`, args2)
    }
}
}}
}

if(args1 === "bluefish"){
    if(!args2){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You didnt write a number for trade.
        `))
    }else{
    if(args2 > bluef){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You dont have enought bluefishes.
        `))
    }
    else {
        if(isNaN(args2)) {
            message.channel.send(new dc.MessageEmbed().setDescription(`
            ${client.emotes.error} | This is not a number.
            `))
        }
    else {
    if(args2 > 64){
        message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You can sell maximum 64!
        `))
    }
    else {
    message.channel.send(new dc.MessageEmbed().setDescription(`
    ${client.emotes.success} | You have sold ${args2} bluefishes for ${para5} iron.
    `))
    db.add(`iron_${message.author.id}`, para5)
    db.subtract(`bluef_${message.author.id}`, args2)
    }
}
}}
}



}
}
}