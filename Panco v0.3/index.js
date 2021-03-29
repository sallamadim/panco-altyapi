const Discord = require('discord.js')
const {cords, Client, CommandHandler, EventHandler} = require('cords-handler')
const { Player } = require('discord-player')
//////////////////////////////////clientlar///////////////////////////////
const client = new Discord.Client({"partials": ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION', 'USER']})
const chclient = new Client()
const { token,owner,mongo } = require('./config/config.json')
//////////////////////////////////clientlar///////////////////////////////

/////////////////////////////////dbler///////////////////////////////////
const wdb = require('wio.db')
const { Database } = require('g9db')
const mongoose = require('mongoose')
mongoose.connect(mongo, {useNewUrlParser: true, useUnifiedTopology: true})
const db = new Database(mongo,"pancodb")
client.player = new Player(client, {
  autoSelfDeaf: true
})
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

const tbl = new TBL("tbl token", client)
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

My prefix is: \`panco\` or \`/\` <a:zil:788340538138558475>

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


client.on("guildMemberAdd", async(member) => {
  let system = await db.fetch(`welcome.ch_${member.guild.id}`)  
  if(!system) return;
  const canvacord = require('canvacord')

  const sa = new canvacord.Welcomer()
.setUsername(member.user.username)
.setDiscriminator(member.user.discriminator)
.setMemberCount(member.guild.memberCount)
.setGuildName(member.guild.name)
.setAvatar(member.user.avatarURL({dynamic: true, format: "png", size: 1024}))
.setColor("border", "#8015EA")
.setColor("username-box", "#8015EA")
.setColor("discriminator-box", "#8015EA")
.setColor("message-box", "#8015EA")
.setColor("title", "#8015EA")
.setColor("avatar", "#8015EA")
.setText("title", `Welcome`)
.setText("message", `Welcome to server ${member.guild.name}`)

sa.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "WelcomeCard1.png");
        client.channels.cache.get(system).send(attachment)
    });

})

client.on("guildMemberRemove", async(member) => {
  const canvacord = require('canvacord')
  let system = await db.fetch(`welcome.ch_${member.guild.id}`)  
  if(!system) return;

  const rank = new canvacord.Leaver()
.setUsername(member.user.username)
.setDiscriminator(member.user.discriminator)
.setMemberCount(member.guild.memberCount)
.setGuildName(member.guild.name)
.setAvatar(member.user.avatarURL({dynamic: true, format: "png", size: 1024}))
.setColor("border", "#ff4a4a")
.setColor("username-box", "#ff4a4a")
.setColor("discriminator-box", "#ff4a4a")
.setColor("message-box", "#ff4a4a") 
.setColor("title", "#ff4a4a")
.setColor("avatar", "#ff4a4a")
.setText("title", `Good Bye`) 
.setText("message", `Leaved from ${sa}`)

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "WelcomeCard.png");
        client.channels.cache.get(system).send(attachment)
    });
})


client.on('message', async message => {
  let system = await db.fetch(`level.system_${message.guild.id}`)
if(!system) return;
  const gui =      
  message.guild
  const aut = message.author;
  if(aut.bot) return
  const data = await db.fetch(`levelUser_${aut.id+gui.id}`)
  const randomExp = require('./config/randomExp')
  if(data != null) {
      await  db.set(`levelUser_${aut.id+gui.id}`,{id:aut.id,level:data.level,exp:data.exp+randomExp,expLimit:data.expLimit,totalExp:data.totalExp+randomExp})
    
  }
  if(data != null) {
       const onlydata = await db.fetch(`levelUser_${aut.id+gui.id}`)
       if(onlydata.expLimit < onlydata.exp) {
       await db.set(`levelUser_${aut.id+gui.id}`,{id:aut.id,level:data.level+1,exp:0,expLimit:data.expLimit*2,totalExp:data.totalExp+randomExp})
       client.channels.cache.get(system).send(`Level UP! ${aut} you have leveled up! Your new level: ${data.level+1}!`)  
    }
   }
  if(data == null) {
    await db.set(`levelUser_${aut.id+gui.id}`,{id:aut.id,level:0,exp:randomExp,expLimit:100,totalExp:randomExp})
  }
  })
db.on('error', (error) => {
  console.log(error)
})


client.on("guildMemberAdd", async member => {
  var kanal = await db.fetch(`sayackanal_${member.guild.id}`)
    var hedef = await db.fetch(`sayachedef_${member.guild.id}`)
    if(!kanal) return;
    const Canvas = require("canvas"),
  Image = Canvas.Image,
  Font = Canvas.Font,
  path = require("path");

const canvas = Canvas.createCanvas(640, 360);
const ctx = canvas.getContext("2d");

const background = await Canvas.loadImage(
  "https://cdn.discordapp.com/attachments/805042200534712340/812986211865198592/Baslksz-1.png"
);
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "#74037b";
ctx.strokeRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = `#D3D3D3`;
ctx.font = `37px "Warsaw"`;
ctx.textAlign = "center";
ctx.fillText(`${member.user.username}`, 300, 342);
ctx.fillText(`We are ${member.guild.memberCount} members now!`, 300, 38, 500, 200)
let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
const avatar = await Canvas.loadImage(avatarURL);

ctx.beginPath();
ctx.lineWidth = 4;
ctx.fill();
ctx.lineWidth = 4;
ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
ctx.clip();

ctx.drawImage(avatar, 250, 55, 110, 110);

const attachment = new Discord.MessageAttachment(
  canvas.toBuffer(),
  "counter-welcome.jpg"
);


    client.channels.cache.get(kanal).send(attachment)
    
  
})

client.on("guildMemberRemove", async member => {
  var kanal = await db.fetch(`sayackanal_${member.guild.id}`)
    var hedef = await db.fetch(`sayachedef_${member.guild.id}`)
    if(!kanal) return;
    const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");
    
    const canvas = Canvas.createCanvas(640, 360);
    const ctx = canvas.getContext("2d");
    
    const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/805042200534712340/812987577400426506/Baslksz-1.png"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = `#D3D3D3`;
    ctx.font = `37px "Warsaw"`;
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.username}`, 300, 342);
    ctx.fillText(`We are ${member.user.memberCount} members now!`, 300, 38, 500, 200)
    
    let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
    const avatar = await Canvas.loadImage(avatarURL);
    
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 250, 55, 110, 110);
    
    const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "counter-byebye.jpg"
    );
    
    client.channels.cache.get(kanal).send(attachment)

})

client.on("guildMemberAdd", async (member) => {
  var kanal = await db.fetch(`sayackanal_${member.guild.id}`)
    var hedef = await db.fetch(`sayachedef_${member.guild.id}`)
    if(!kanal) return;

    if(hedef <= member.guild.memberCount) {
      client.channels.cache.get(kanal).send(`
      ${client.emotes.success} | I have deleted counter system number from my database! Because we have reached **${hedef}** members! 
      `)
      await db.delete(`sayachedef_${member.guild.id}`)
    }
})


client.login(token)