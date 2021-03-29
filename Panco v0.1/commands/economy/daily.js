
const dc=require('discord.js')
const ms=require('parse-ms')
const { time } = require("console")
const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const d = new Database(mongo,"pancodb")
module.exports = {
    name: "daily",
    aliases: [],
    run: async (client, message, args) => {
    let bal = await d.fetch(`iron_${message.author.id}`)
    let bal2 = await d.fetch(`gold_${message.author.id}`)
    let bal3 = await d.fetch(`diamond_${message.author.id}`)
    let bal4 = await d.fetch(`emerald_${message.author.id}`)

let cooldown = 86400000 // 24 Saat

    let lastDaily = await d.fetch(`süre_${message.author.id}`);
    if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));

        return message.channel.send(new dc.MessageEmbed().setDescription(`
        ${client.emotes.error} | You need to wait; ${timeObj.hours} hour(s), ${timeObj.minutes} minute(s), ${timeObj.seconds} second(s). To use this command.
        `))

    } else {

        let gelcekpra = Math.floor(Math.random() * 100) + 100;
        let bal = await d.fetch(`iron_${message.author.id}`)
        let bal2 = await d.fetch(`gold_${message.author.id}`)
        let bal3 = await d.fetch(`diamond_${message.author.id}`)
        let bal4 = await d.fetch(`emerald_${message.author.id}`)


    message.channel.send(new dc.MessageEmbed().setDescription(`
    ${client.emotes.success} | You have collected you daily award!\nYou got ${gelcekpra} irons!
        `))
        await d.set(`süre_${message.author.id}`, Date.now());
        await d.add(`iron_${message.author.id}`, gelcekpra)

    }
}
}