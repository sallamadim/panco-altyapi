const discord = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
    name: `hug`,
    aliases: [],
    run: async (client, message, args) => {
        try {
        
            let user = message.mentions.users.first()
            if(!user) return message.reply(`${client.emotes.error} | Mention a user.`)
            if(user.bot) return message.reply(`${client.emotes.error} | The user is bot.`)
            if(user.id == message.author.id) return message.reply(`${client.emotes.error} | The user is you.`)
            fetch(`https://some-random-api.ml/animu/hug`)
            .then(res => res.json()).then(body => {
                if(!body) return message.reply(`${client.emotes.error} | Got an error.`)
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${message.author} huggies ${user}
            `).setImage(body.link))
            })
    } catch (err) {
        console.log(err)
    }
    },
}