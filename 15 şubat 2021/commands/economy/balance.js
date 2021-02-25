
const dc=require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "balance",
    aliases: ["bal"],
    run: async (client, message, args) => {
let user = message.mentions.users.first() || message.author

let bal = await db.fetch(`iron_${user.id}`)
let bal2 = await db.fetch(`gold_${user.id}`)
let bal3 =await  db.fetch(`diamond_${user.id}`)
let bal4 =await  db.fetch(`emerald_${user.id}`)


if(bal == null || undefined)bal = "0";
if(bal2 == null || undefined)bal2 = "0";
if(bal3 == null || undefined)bal3 = "0";
if(bal4 == null || undefined)bal4 = "0";

message.channel.send(new dc.MessageEmbed().setDescription(`
${user}'s Balance;

• have ${bal} irons. <:demir:786961429076901909>
• have ${bal2} golds. <:altin:786961288562475039>
• have ${bal3} diamonds. <a:elmas:786961212126134312>
• have ${bal4} emeralds. <:zumrut:786961762586460190> 


• To see your items type: \`inventory\`
`))
}
}