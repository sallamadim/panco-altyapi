const 
{
    MessageEmbed
} 
= 
require
(
    'discord.js'
    )

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "level-channel",
    aliases: [],
    run: async (client, message, args) => {
        let system = await db.fetch(`level.system_${message.guild.id}`)
        let channel = message.mentions.channels.first()
        let sq = args[0]

        if(!message.member.hasPermission("ADMINISTRATOR")) {return message.channel.send(`${client.emotes.error} | You dont have permission.`)
    } else {
        if(!sq) {
        message
    .channel
.send(new MessageEmbed()
.setDescription(`
${client.emotes.error} | You need to specify a valid thing.

Examples:
\`\`\`
panco level-channel set #channel
panco level-channel close
\`\`\`
`)) } else {
    if(sq ==
        "set") 
        {
            if(system) {
                return message
                .channel
                .send(new MessageEmbed
                    ()
                    .setDescription(`
                    ${client.emotes.error} | System already opened.
                    `))
            } 
            else 
            {
                if(!channel) {
                    return message.
                    channel
                    .send(new MessageEmbed
                        ()
                        .setDescription(
                            `
                            ${client.emotes.error} | Mention a channel.
                            ` 
                        ))
                }
                else
                {
                    await db.set(`level.system_${message.guild.id}`, channel.id)
                    return message
                    .channel
                    .send(new MessageEmbed
                        ()
                        .setDescription(
                            `
                            ${client.emotes.success} | Channel set! ${channel}
                            `
                        ))
                }
            }
        } else {
                if(sq 
                    ==
                    "close"
                    ) {
                        if(!system) { return message
                            .channel
                            .send(
                                `${client.emotes.error} | System is not opened.`
                                ) 
                            } 
                            else 
                            {
                            await db.delete(`level.system_${message.guild.id}`)
                            return message
                            .channel
                            .send
                            (`
                            ${client.emotes.success} | Level system closed successfully.
                            `)
                        }
                    }
        }
}
        }
    },
}