
const dc=require('discord.js')
const ms=require('parse-ms')
const { time } = require("console")
const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const d = new Database(mongo,"pancodb")
module.exports = {
    name: "inventory",
    aliases: ["inv"],
    run: async (client, message, args) => {

    let bal = await d.fetch(`iron_${message.author.id}`)
    let bal2 = await d.fetch(`gold_${message.author.id}`)
    let bal3 = await d.fetch(`diamond_${message.author.id}`)
    let bal4 = await d.fetch(`emerald_${message.author.id}`)
        //balıklar
        let carp = await d.fetch(`carp_${message.author.id}`)
        let walleye = await d.fetch(`walleye_${message.author.id}`)
        let pike = await d.fetch(`pike_${message.author.id}`)
        let blueg = await d.fetch(`blueg_${message.author.id}`)
        let bluef = await d.fetch(`bluef_${message.author.id}`)

if(carp == null || undefined)carp = "0";
if(walleye == null || undefined)walleye = "0";
if(pike == null || undefined)pike = "0";
if(blueg == null || undefined)blueg = "0";
if(bluef == null || undefined)bluef= "0";

if(bal == null || undefined)bal = "0";
if(bal2 == null || undefined)bal2 = "0";
if(bal3 == null || undefined)bal3 = "0";
if(bal4 == null || undefined)bal4 = "0";
    
    //itemler
    let sword = await d.fetch(`sword_${message.author.id}`)
    let fs = await d.fetch(`rod_${message.author.id}`)
    let axe = await d.fetch(`axe_${message.author.id}`)
    //eşya
    let string = await d.fetch(`string_${message.author.id}`)
    let stick = await d.fetch(`stick_${message.author.id}`)
    if(string == null || undefined)string = "0";
    if(stick == null || undefined)stick = "0";

    
    

    if(await d.has(`sword_${message.author.id}`))sword = "<:tick:777580239979151381>"
    if(!await d.has(`sword_${message.author.id}`))sword = "<:notick:777580585085829150>"


    if(await d.has(`rod_${message.author.id}`))fs= "<:tick:777580239979151381>"
    if(!await d.has(`rod_${message.author.id}`))fs = "<:notick:777580585085829150>"

    if(await d.has(`axe_${message.author.id}`))axe = "<:tick:777580239979151381>"
    if(!await d.has(`axe_${message.author.id}`))axe = "<:notick:777580585085829150>"
    message.channel.send(new dc.MessageEmbed().setDescription(`
    <:tick:777580239979151381> = You have.
    <:notick:777580585085829150> = You dont have.

    Sword = ${sword}
    Fishing Rod: ${fs}
    Axe: ${axe}

    Your all materials:
    String = ${string}
    Stick = ${stick}

    Your fishes:
    Carp = ${carp}
    Walleye = ${walleye}
    Pike = ${pike}
    Bluegill = ${blueg}
    Bluefish = ${bluef}
    `))

}
}