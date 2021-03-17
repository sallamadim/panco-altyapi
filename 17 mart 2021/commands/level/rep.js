const { MessageEmbed } = require('discord.js')
const ms = require('parse-ms')
const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "rep",
    aliases: [],
    run: async (client, message, args) => {
        const rep = await db.fetch(`rep_${message.guild.id}_${message.author.id}`)
        let user = message.mentions.users.first()
        if(!user)return message.channel.send(`${client.emotes.error} | Mention a user.`)
        if(user.bot) return message.channel.send(`${client.emotes.error} | You cant give rep to a bot.`)
    if(user.id == message.author.id) return message.channel.send(`${client.emotes.error} | Are you sure about that?`)

    let cooldown = 3600000
    let lastDaily = await db.fetch(`süre_${message.author.id}`);
    if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));

        return message.channel.send(new MessageEmbed().setDescription(`
        ${client.emotes.error} | To use this command again you need to wait; ${timeObj.hours} hour(s), ${timeObj.minutes} minute(s), ${timeObj.seconds} second(s).
        `))
    
    } else {

        await db.set(`süre_${message.author.id}`, Date.now())

    await db.add(`rep_${message.guild.id}_${user.id}`, 1)
        message.channel.send(`${client.emotes.success} | You have give **1** rep to ${user}.`)
    }
    }}