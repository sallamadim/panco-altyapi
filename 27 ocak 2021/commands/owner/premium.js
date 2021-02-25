const db = require('wio.db')
const Discord = require('discord.js')
const ayarlar = require('../../config/config.json').owner
const FynxDogru = "BLACK";
const FynxHata = "BLACK"
module.exports = {
    name: "premium",
    aliases: [],
    run: async (client, message, args) => {

    let seçenekler = args[0]
    if(!seçenekler)return message.channel.send({embed: {color: FynxHata, description: `You need to specify a thing.
    If you are a user you can use; \`use-code\` only.

    If you are my owner you can use: \`un-premium\` \`delete code/user\` \`add-premium\` \`make-code\` \`delete-code\` \`premium-list\` \`code-list\`

    ` }})
    if(seçenekler === "use-code") {
        let kod = args[1]
        if(!kod)return message.channel.send({embed: {color: FynxHata, description: `${client.emotes.error} | You need to specify a code.` }})
        let kodvarmı = db.fetch(`preKod_${kod}`)
        if(!kodvarmı)return message.channel.send({embed: {color: FynxHata, description: `${client.emotes.error} | I cant find that code.` }})
        let kullanıcıpremi = db.fetch(`preKullanıcı_${message.author.id}`)
        if(kullanıcıpremi)return message.channel.send({embed: {color: FynxHata, description: `${client.emotes.error} | You are premium.` }})
        message.channel.send({embed: {color: FynxHata, description: `${client.emotes.success} | You have used the code, and got the premium codes!` }})
        db.delete(`preKod_${kod}`)
        db.set(`preKullanıcı_${message.author.id}`, `${message.author.tag} - ${kod}`)
        }
    if(seçenekler === "un-premium") {
    if(message.author.id !== ayarlar)return message.channel.send({embed: {color: "BLACK", description: `${client.emotes.error} | You are not my owner.`}})
    let kullanıcı = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1])
    if(!kullanıcı)return message.channel.send({embed: {color: FynxHata, description: `You didnt mention a user.` }})
    let kullanıcıpremi = db.fetch(`preKullanıcı_${kullanıcı.id}`)
    if(!kullanıcıpremi)return message.channel.send({embed: {color: FynxHata, description: `He is not premium tho.` }})
    message.channel.send({embed: {color: FynxHata, description: `I have un premium the member: <@${kullanıcı.id}>` }})
    db.delete(`preKullanıcı_${kullanıcı.id}`)
    }
    if(seçenekler === "delete") {
    if(message.author.id !== ayarlar)return message.channel.send({embed: {color: "BLACK", description: `${client.emotes.error} | You are not my owner.`}})
    if(args[1] === "code") {
    if(!db.startsWith(`preKod`))return message.channel.send({embed: {color: FynxHata, description: `There is no premium code tho..` }})
    message.channel.send({embed: {color: FynxHata, description: `I have deleted all of the premium codes.` }})
    return db.deleteDataEach(`preKod`)
    }
    if(args[1] === "user") {
    if(!db.startsWith(`preKullanıcı`))return message.channel.send({embed: {color: FynxHata, description: `There is no people with premium..` }})
    message.channel.send({embed: {color: FynxHata, description: `I have un premium the all user.` }})
    return db.deleteDataEach(`preKullanıcı`)
    }
    if(!db.startsWith(`preKod`)) {
    message.channel.send({embed: {color: FynxHata, description: `There is no premium code tho..` }})
    } else {
    message.channel.send({embed: {color: FynxHata, description: `I have deleted all of the premium codes.` }})
    db.deleteDataEach(`preKod`)
    }
    if(!db.startsWith(`preKullanıcı`)) {
    message.channel.send({embed: {color: FynxHata, description: `There is no people with premium..` }})
    } else {
    message.channel.send({embed: {color: FynxHata, description: `I have un premium the all user.` }})
    db.deleteDataEach(`preKullanıcı`)
    }
    }
    if(seçenekler === "add-premium") {
    if(message.author.id !== ayarlar)return message.channel.send({embed: {color: "BLACK", description: `${client.emotes.error} | You are not my owner.`}})
    let kullanıcı = message.guild.member(message.mentions.users.first())
    if(!kullanıcı)return message.channel.send({embed: {color: FynxHata, description: `You didnt mention a member.` }})
    let kullanıcıpremi = db.fetch(`preKullanıcı_${kullanıcı.id}`)
    if(kullanıcıpremi)return message.channel.send({embed: {color: FynxHata, description: `The user already premium.` }})
    message.channel.send({embed: {color: FynxHata, description: `I have added premium to <@${kullanıcı.id}>.` }})
    db.set(`preKullanıcı_${kullanıcı.id}`, `${kullanıcı.user.tag} - The user didnt use code.`)
    }
    if(seçenekler === "make-code") {
    if(message.author.id !== ayarlar)return message.channel.send({embed: {color: "BLACK", description: `${client.emotes.error} | You are not my owner.`}})
    var kod = require("generate-password").generate({length: 25,numbers: true});
    db.set(`preKod_${kod}`, kod)
    setTimeout(() => {
    message.channel.send(`I have created a code that like; 
\`\`\`css
${kod}
\`\`\` `)
    }, 3);
    }
    if(seçenekler === "delete-code") {
    if(message.author.id !== ayarlar)return message.channel.send({embed: {color: "BLACK", description: `${client.emotes.error} | You are not my owner.`}})
    let kod = args[1]
    if(!kod)return message.channel.send({embed: {color: "BLACK", description: `You need to specify a code.`}})
    let kodvarmı = db.fetch(`preKod_${kod}`)
    if(!kodvarmı)return message.channel.send({embed: {color: "BLACK", description: `I cant find that code.`}})
    db.delete(`preKod_${kod}`)
    message.channel.send({embed: {color: "BLACK", description: `I have deleted a code.`}})
    }
    if(seçenekler === "premium-list") {
    if(message.author.id !== ayarlar)return message.channel.send({embed: {color: "BLACK", description: `${client.emotes.error} | You are not my owner.`}})
    let kullanıcılar = db.startsWith(`preKullanıcı`)
    if(!kullanıcılar)return message.channel.send({embed: {color: "BLACK", description: `There is no premium user.`}})
    message.channel.send({embed: {color: "BLACK", description: `The premium users; [User - \`Used Code\`]\n\`\`\`${kullanıcılar.map(kullanıcılar => `• ${kullanıcılar}`).join("\n")}\`\`\``}})
    }
    if(seçenekler === "code-list") {
    if(message.author.id !== ayarlar)return message.channel.send({embed: {color: "BLACK", description: `You are not my owner.`}})
    let kodlar = db.startsWith(`preKod`)
    if(!kodlar)return message.channel.send({embed: {color: "BLACK", description: `There is no code.`}})
    message.channel.send({embed: {color: "BLACK", description: `The codes that i have like;\n\`\`\`${kodlar.map(kodlar => `• ${kodlar}`).join("\n")}\`\`\``}})
    }}
}