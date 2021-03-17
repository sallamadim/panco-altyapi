const {MessageEmbed, Message, GuildMemberRoleManager, Client} = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "channel",
    aliases: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {  
        if(!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send(`${client.emotes.error} | You dont have permission.`) }
        if(!message.guild.me.hasPermission("ADMINISTRATOR")) { return message.channel.send(`${client.emotes.error} | I dont have permission.`) }
        const w = args[0]

        if(!w) {
            message.channel.send(`${client.emotes.error} | Please specify a valid thing.`)
            .then(msg => {
                msg.channel.send(new MessageEmbed().setDescription(`
Examples:
\`\`\`
panco channel create {text / voice} {name}
panco channel delete {channel id}
panco channel nuke {channel}
panco channel copy {channel}
panco channel lock {channel}
panco channel unlock {channel}

The {} are required. [] is optional.
\`\`\`
            
                `))
            })
        } else {
            if(w == "create") {
                const type = args[1]
                const name = args[2]
                if(!type) {
                    message.channel.send(`${client.emotes.error} | Specify a type.`)
                } else {
                    if(type !== "text" && type !== "voice") {
                        message.channel.send(`${client.emotes.error} | That's not a valid type.`)
                    } else {
                        if(!name) {
                            message.channel.send(`${client.emotes.error} | Specify a name.`)
                        } else {
                            message.guild.channels.create(name, {
                                type: type,
                                permissionOverwrites: [],
                                reason: 'Panco channel system.'
                            })
                            message.channel.send(`${client.emotes.success} | Channel created!`)
                        }
                    }
                }
            } else {
                if(w == "delete") {
                    const channel = client.channels.cache.get(args[1])
                    if(!channel) return message.channel.send(`${client.emotes.error} | You must specify a valid channel id for delete.`)
                    
                    channel.delete()
                    message.channel.send(`${client.emotes.success} | Channel deleted.`)
                } else {

                    if(w == "copy") {
                        const channel = message.mentions.channels.first()
                        if(!channel) {
                            return message.channel.send(`${client.emotes.error} | Mention a channel.`)
                        } else {
                            message.guild.channels.create(channel.name, {
                                type: channel.type,
                                permissionOverwrites: channel.permissionOverwrites,
                                rateLimitPerUser: channel.rateLimitPerUser,
                                reason: 'Panco channel system.'
                            })
                            message.channel.send(`${client.emotes.success} | Channel copied!`)
                        }
                    } else {
                        if(w == "lock") {
                            const channel = message.mentions.channels.first()
                            if(!channel) {
                                return message.channel.send(`${client.emotes.error} | Mention a channel.`)
                            }else {
                            const everyone = message.guild.roles.cache.find(x => x.name === "@everyone")
                            channel.updateOverwrite(everyone, {
                                'SEND_MESSAGES': false
                            }, 'Panco channel system.')
                            message.channel.send(`${client.emotes.success} | Locked the ${channel}!`)
                        }
                        } else {
                            if(w == "unlock") {
                                const channel = message.mentions.channels.first()
                                if(!channel) {
                                    return message.channel.send(`${client.emotes.error} | Mention a channel.`)
                                }else {
                            const everyone = message.guild.roles.cache.find(x => x.name === "@everyone")

                            channel.updateOverwrite(everyone, {
                                'SEND_MESSAGES': true
                            },'Panco channel system.')
                            message.channel.send(`${client.emotes.success} | Unlocked the ${channel}!`)
                        }
                            } else {
                                if(w == "nuke") {
                                    const channel = message.mentions.channels.first()
                                    if(!channel) {
                                        return message.channel.send(`${client.emotes.error} | Mention a channel.`)
                                    } else {

                                    const cloned = await channel.fetch()
                                    const webhook1 = await channel.fetchWebhooks()

                                    await channel.delete()
                                    const created = await message.guild.channels.create(cloned.name,{
                                        type: cloned.type,
                                        parent: cloned.parent,
                                        nsfw: cloned.nsfw,
                                        topic: cloned.topic,
                                        rateLimitPerUser: cloned.rateLimitPerUser,
                                        permissionOverwrites: cloned.permissionOverwrites.array()
                                    })
                                    created.setPosition(cloned.rawposition)
                                    for await (const [id, webhook] of webhook1) 
                                    {
                                        await created.createWebhook(webhook.name, {
                                            avatar: webhook.avatar,
                                            reason: 'Panco channel system.'
                                        })
                                    }
                                    message.guild.channels.cache.find(a => a.name === created.name).send("Nuked this channel.\nhttps://imgur.com/LIyGeCR")
                                }
                            }
                            }
                        }
                    }
                }
            }
        }

    },
}