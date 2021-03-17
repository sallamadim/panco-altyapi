const {MessageEmbed, Message, GuildMemberRoleManager} = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "role",
    aliases: [],
    run: async (client, message, args) => {  
        if(!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send(`${client.emotes.error} | You dont have permission.`) }
        if(!message.guild.me.hasPermission("ADMINISTRATOR")) { return message.channel.send(`${client.emotes.error} | I dont have permission.`) }
        let secim = args[0]
        let user = message.mentions.users.first()
        let role = message.mentions.roles.first()
        let secimm = args[1]


        if(!secim) { return message.channel.send(`${client.emotes.error} | Please specify valid thing.`).then(msg => {
            msg.channel.send(new MessageEmbed().setDescription(`Examples:
            \`\`\`
panco role add {user} {role}
panco role remove {user} {role}
panco role create {role name}
panco role delete {role}
panco role copy {role}           
            
The {} are required. [] is optional.\`\`\`
            `))
        }) }

        if(secim == "add") {
            if(!user) {
                return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | Mention a user!`))
            } else {
                if(!role) {
                    return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | Mention a role.`))
                } else {
                    if(message.guild.members.cache.get(user.id).roles.cache.has(role.id)) {
                        return message.channel.send(`${client.emotes.error} | ${user} has this role.`)
                    }  else {
                    message.guild.members.cache.get(user.id).roles.add(role.id)
                    
                    return message.channel.send(new MessageEmbed().setDescription(`
                    ${client.emotes.success} | I have added role **${role}** for **${user}**.
                    `))
                }
            }
            }
        } else {
            if(secim == "remove") {
                if(!user) {
                    return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | Mention a user!`))  
                } else {
                    if(!role) {
                        return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.error} | Mention a role.`))
                    } else {
                        if(!message.guild.members.cache.get(user.id).roles.cache.has(role.id)) {
                            return message.channel.send(`${client.emotes.error} | ${user} doesnt has this role.`)
                        } else {
                        message.guild.members.cache.get(user.id).roles.remove(role.id)
                        return message.channel.send(new MessageEmbed().setDescription(`${client.emotes.success} | I have removed role **${role}** from **${user}**.`))
                    }
                }  
                }
            } else {
                if(secim == "create") {
                    if(!secimm) {
                        return message.channel.send(`${client.emotes.error} | You need to specify a role name.`)
                    } else {
                        message.guild.roles.create({ data: {
                            name: secimm,
                            permissions: [],
                            color: "red"
                        }, reason: "Role system Panco" })
                        return message.channel.send(`${client.emotes.success} | I have created a role named: **${secimm}**.`)
                    }
                } else {
                    if(secim == "delete") {
                        if(!role) {
                            return message.channel.send(`${client.emotes.error} | You need to mention a role.`)
                        } else {
                            if(role.deleteable) { return message.channel.send(`${client.emotes.error} | I cant delete the role.`) }
                          else 
                          {
                              message.guild.roles.cache.find(a => a.name === role.name).delete()
                              message.channel.send(`${client.emotes.success} | Deleted role!`)
                          }  
                        } 
                    } else {
                        if(secim == "copy") {
                            if(!role) {
                                return message.channel.send(`${client.emotes.error} | You need to mention a role.`)
                            } else {
                                message.guild.roles.create({data: {
                                    name: role.name,
                                    permissions: role.permissions,
                                    color: role.color,
                                }, reason: "Panco role system"})
                                return message.channel.send(`${client.emotes.success} | Role copy!`)
                            }
                        }
                    }
                }
            }
        }

    },
}