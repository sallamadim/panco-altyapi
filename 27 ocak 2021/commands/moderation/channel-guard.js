const wio=require('wio.db')
const discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "channel-guard",
    aliases: [],
    run: async (client, message, args) => {  
        let guard = await db.fetch(`channel.guard_${message.guild.id}`)

        let secim = args[0]
        let kullanıcıpremi = wio.fetch(`preKullanıcı_${message.author.id}`)
        if(!kullanıcıpremi){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.error} | This code is only for premium members.
            `))
        }
        else {
            if(kullanıcıpremi){
                if(!message.member.hasPermission("ADMINISTRATOR")){
                    message.channel.send(new discord.MessageEmbed().setDescription(`
                    ${client.emotes.error} | You dont have permission.
                    `))
                }
                else {
                    if(!secim)
                    {
                        message.channel.send(new discord.MessageEmbed().setDescription(`
                        ${client.emotes.error} | Specify enough thing:

                        \`channel-guard open\`
                        \`channel-guard close\`
                        `))
                    }
                    else {
                    if(secim == "open"){
                        if(guard){
                            message.channel.send(new discord.MessageEmbed().setDescription(`
                            ${client.emotes.error} | The system already opened.
                            `))
                        }
                        else {
                            await db.set(`channel.guard_${message.guild.id}`, true)
                            message.channel.send(new discord.MessageEmbed().setDescription(`
                            ${client.emotes.success} | System has been opened.
                            `))
                        }
                    }
                    else {
                        if(secim == "close"){
                            if(!guard){
                                message.channel.send(new discord.MessageEmbed().setDescription(`
                                ${client.emotes.error} | System is not opened.
                                `))
                            }
                            else {
                                db.delete(`channel.guard_${message.guild.id}`)
                                message.channel.send(new discord.MessageEmbed().setDescription(`
                                ${client.emotes.success} | System has been closed.
                                `))

                            }
                        }
                    }


                }   
                }
        }
    }
    }
}
