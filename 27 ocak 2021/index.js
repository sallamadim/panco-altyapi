const Discord = require('discord.js')
const {cords, Client, CommandHandler, EventHandler} = require('cords-handler')
const { Player } = require('discord-player')
//////////////////////////////////clientlar///////////////////////////////
const client = new Discord.Client({"partials": ['CHANNEL', 'MESSAGE']})
const chclient = new Client()
const { token,prefix,owner,mongo } = require('./config/config.json')
//////////////////////////////////clientlar///////////////////////////////

/////////////////////////////////dbler///////////////////////////////////
const wdb = require('wio.db')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
client.player = new Player(client)
client.config = require('./config/config')
client.emotes = client.config.emojis
client.filters = client.config.filters
/////////////////////////////////dbler///////////////////////////////////

////////////////////////////////öbür modüller///////////////////////////
const fs = require('fs')
const TBL = require("@foxreistr/tbl-api.js");
const moment = require('moment')
const { join } = require('path')
const { GiveawaysManager } = require('discord-giveaways');
////////////////////////////////öbür modüller///////////////////////////

//////////////////////////////////önemliler///////////////////////////////

const tbl = new TBL("tbl token", client) //https://discord.gg/eJSaS2QrKv
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./config/giveaways.json",
  updateCountdownEvery: 3000,
  default: {
      botsCanWin: false,
      embedColor: "#FF0000",
      reaction: "797071398878183464"
  }
});

let command_handler = new CommandHandler(client,chclient)
.setCommandFolder("./commands")
  .setPrefix("panco")
  .setPrefix2("Panco")
  .setPrefix3("/")
  .setPrefix4(`<@!780415059016417290>`)
  .setPrefix5(`<@780415059016417290>`)
  .loader();
let eventhander = new EventHandler(client, chclient)
.setEventFolder("./events")
.loader()
//////////////////////////////////önemliler///////////////////////////////
wdb.backup('./config/database.json')



client.on("guildMemberAdd", async(member,message) => {
    let kanal = await db.fetch(`otok_${member.guild.id}`);
    let rol = await db.fetch(`otorol_${member.guild.id}`);
    let mesaj = db.fetch(`otomesaj_${member.guild.id}`);
    if (!kanal) return;
    if (!mesaj) {
      client.channels
        .cache.get(kanal)
        .send(`
Someone joined. <a:katildi:788340550204915723>

Welcome to server ${member.user.username}
        
        
        `);
      member.roles.add(rol);
      return;
    }
  
    if (mesaj) {
      var mesajs = await db
        .fetch(`otomesaj_${member.guild.id}`)
        .replace("-member-", `${member.user.tag}`)
        .replace("-role-", `${member.guild.roles.cache.get(rol).name}`)
        .replace("-server-", `${member.guild.name}`)
        .replace("-membercount-", `${member.guild.memberCount}`)
        .replace(
          "-botcount-",
          `${member.guild.members.cache.filter(m => m.user.bot).size}`
        )
        .replace("-region-", `${member.guild.region}`)
        .replace("-channelcount-", `${member.guild.channels.cache.size}`);
      member.roles.add(rol);
      client.channels.cache.get(kanal).send(mesajs);
    }
})

const chalk = require('chalk');
const { isValidObjectId } = require('mongoose')
const { min } = require('moment')
console.log(chalk.red(`Loaded ${client.commands.size} command.`))

client.on("guildCreate", async(guild) => {
  console.log(guild.name)
})

client.on("channelDelete", async(channel) => {
  const entry = await channel.guild
  let guard = await db.fetch(`channel.guard_${channel.guild.id}`)
if(!guard) return;
  const created = await channel.guild.channels.create(channel.name, {
    type:channel.type,
    parent:channel.parent,
    nsfw:channel.nsfw,
    topic:channel.topic,
    rateLimitPerUser:channel.rateLimitPerUser,
    position:channel.rawPosition,
    permissionOverwrites:channel.permissionOverwrites.array()
  })
})

client.on("message", async(message) => {
  
if(message.content.toLowerCase() === `<@!${client.user.id}>`){
  message.channel.send(
new Discord.MessageEmbed().setDescription(`


Hello! <a:ElSallamaGif:788340548246700072>

My prefix is: \`panco\` or \`/\` or \`mention\` <a:zil:788340538138558475>

I have premium system, to be premium member contact to my owner or join the support server!

**Links that recommened:**

**Website:**
> https://panco.glitch.me/home-page.html

**Invite link (0 perm not recommened):** 
> https://discord.com/oauth2/authorize?client_id=780415059016417290&scope=bot&permissions=0

**Invite link (8 perm recommened):**
> https://discord.com/oauth2/authorize?client_id=780415059016417290&scope=bot&permissions=8

See you next time!
`)
.setThumbnail(client.user.avatarURL())
.setAuthor(client.user.username)
  )
}
})

console.log(`    
                                                  _       
                                                 | |      
_ __   __ _ _ __   ___ ___    _ __ ___   __  _ __| |_   _ 
| '_ \\ / _\` | '_ \\ / __/ _ \\  | '__/ _ \\/ _\` |/ _\` | | | |
| |_) | (_| | | | | (__ (_) | | | |  __/ (_| | (_| | |_| |
| .__/ \\__,_|_| |_|\\___\\___/  |_|  \\___|\\__,_|\\__,_|\\__, |
| |                                                  __/ |
|_|                                                 |___/                                                 
`)

client.login(token)
