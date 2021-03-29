const { MessageAttachment } = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "rank",
    aliases: [],
    run: async (client, message, args) => {
        const data = await db.fetch(`levelUser_${message.author.id+message.guild.id}`) || 0
        const rep = await db.fetch(`rep_${message.guild.id}_${message.author.id}`) || 0
let owner = "755325329005871144"
if(message.author.id != owner) owner = "An bot user."
if(message.author.id == owner) owner = "My owner."

const Canvas = require('discord-canvas')
          const image = await new Canvas.RankCard()
          .setAvatar(message.author.avatarURL({ dynamic: true, format: "png", size: 1024 }))
          .setXP("current", data.exp)
          .setXP("needed", data.expLimit)
          .setLevel(data.level)
          .setRank(0)
          .setReputation(rep)
          .setRankName(`${owner}`)
          .setUsername(message.author.username)
          .setBackground("https://cdn.discordapp.com/attachments/804660809837445132/805044219986837554/bff9e5c630.png")
          .setColor("no-badges", "#000000")
          .setColor("badges-box", "#000000")
          
          .toAttachment();
          
 
          const attachment = new MessageAttachment(image.toBuffer(), "rankcard.png");
           
          message.channel.send(attachment);
          message.channel.send("If the current exp and needed exp is shows **undefined** type: `panco level-channel set #channel` for no undefined.")
    }}