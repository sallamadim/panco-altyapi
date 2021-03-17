
const Discord = require('discord.js')
const os = require('os')
const moment = require('moment')
require('moment-duration-format')
module.exports = {
    name: "stats",
    aliases: [],
    run: async (client, message, args) => {

if (message.author.bot) return;

let uptime = moment.duration(client.uptime).format("D [day] , H [hour], m [minute], s [second]")
let servercount = client.guilds.cache.size;
let usercount = client.users.cache.size;
let channelscount = client.channels.cache.size;
let arch = os.arch();
let platform = os.platform();
let shard = client.ws.shards.size;
let NodeVersion = process.version;
let cores = os.cpus().length;

if(shard == null || undefined) shard = "0"

let stats = new Discord.MessageEmbed()
.setAuthor('sallamadım#0031')
.setTitle(`Statistics of ${client.user.username}`)
.setColor('RED')
.addField("Server Count", `${servercount}`, true)
.addField("Users Count", `${usercount}`, true)
.addField("Channel's Count", `${channelscount}`, true)
.addField('Architecture', `${arch}`, true)
.addField('Platform', `${platform}`, true)
.addField('Node-Version', `${NodeVersion}`, true)
.addField('Shards', `${shard}`, true)
.addField('Cores', `${cores}`, true)
.addField(`Uptime`, `${uptime}`, true)
.setTimestamp()
.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
message.channel.send(stats);
}
}
