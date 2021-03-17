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

const lvl5Badge = "https://cdn.discordapp.com/attachments/805042200534712340/812318593680277534/5lvlBadge.png" 
const lvl10Badge = "https://cdn.discordapp.com/attachments/805042200534712340/812318594121203712/10lvlBadge.png"
const lvl15Badge = "https://cdn.discordapp.com/attachments/805042200534712340/812318595400990760/15lvlBadge.png"
const lvl25Badge = "https://cdn.discordapp.com/attachments/805042200534712340/812318596834263070/25lvlBadge.png"
const lvl35Badge = "https://cdn.discordapp.com/attachments/805042200534712340/812318598151405588/35lvlBadge.png"

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
          .setBackground("https://cdn.discordapp.com/attachments/805042200534712340/812352168488992788/unknown.png")
          .setColor("no-badges", "#5099ff")
          .setColor("badges-box", "#5099ff")
          .setColor("level-box", "#5099ff")
          .setColor("reputation-box", "#5099ff")
          .toAttachment();  
          if(data.level == 5) {
              image.setBadge(1, lvl5Badge)
          }
          
          
        

          const attachment = new MessageAttachment(image.toBuffer(), "rankcard.png");
           

          message.channel.send(attachment);
    
        },
    }