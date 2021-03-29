const discord = require('discord.js')
const ms = require('parse-ms')

module.exports = {
    name: "waifurate",
    aliases: ["waifu-rate"],
    run: async (client, message, args) => {
        const reaction = [
            '🤢',
            '😰',
            '😵',
            '😥',
            '😕',
            '😗',
            '😏',
            '😌',
            '☺',
            '💁'
          ]

          let target = message.mentions.users.first() || message.author
          const rating = Math.floor(Math.random() * 100) + 1

          message.channel.send(new discord.MessageEmbed().setTitle("waifu r8 machine").setDescription(`
          ${target} ${rating}/100 waifu ${reaction[Number((rating / 10).toFixed()) - 1]}
          `))
    },
}