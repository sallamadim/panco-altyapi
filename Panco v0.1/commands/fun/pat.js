const discord = require('discord.js')
module.exports = {
    name: "pat",
    aliases: [],
    run: async (client, message, args) => {
        try {
            let user = message.mentions.users.first()
            if(!user) return message.reply(`${client.emotes.error} | You need to mention someone.`)
            if(user.bot) return message.reply(`${client.emotes.error} | The user is bot.`)
            if(user.id == message.author.id) return message.reply(`${client.emotes.error} | The user is you.`)

            require('request')({url: "https://nekos.life/api/pat", json: true}, (req, res, json) => {
                message.channel.send(new discord.MessageEmbed().setDescription(`
                ${message.author} patted ${user}
                `).setImage(json.url))
            }) 

        } catch (err) {
            console.log(err)
        }   


    },
}