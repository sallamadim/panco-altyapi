const ms = require('ms')
const discord = require('discord.js')
module.exports = {
    name: "end",
    aliases: [],
    run: async (client, message, args) => {

        if(!message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send(new discord.MessageEmbed().setDescription(`
            ${client.emotes.error} | You dont have permission.
            `))
        }
        else
        {
            if(!args[0]){
                message.channel.send(new discord.MessageEmbed().setDescription(`
                ${client.emotes.error} | Please specify a valid message id.
                `))
            }
            else
            {
                let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

                if(!giveaway){
                    return message.channel.send(new discord.MessageEmbed().setDescription(`
                    ${client.emotes.error} | Unable to find a giveaway for \`${args.join(' ')}\`
                    
                    `));
                }
                else
                {
                    client.giveawaysManager.edit(giveaway.messageID, {
                        setEndTimestamp: Date.now()
                    }).then(() => {
                        message.channel.send(new discord.MessageEmbed().setDescription(`
                        ${client.emotes.success} | Giveaway will end less then:

                        ${(client.giveawaysManager.options.updateCountdownEvery/1000)} seconds.
                        `))
                    })
                    .catch((e) => {
                        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
                            message.channel.send(new discord.MessageEmbed().setDescription(`
                            ${client.emotes.error} | This giveaway already ended.
                            `));
                        }
                        else {
                            console.error(e);
                            message.channel.send(new discord.MessageEmbed().setDescription(`
                            ${client.emotes.error} | An error occured...
                            `))
                        }
                    })



}}}}
}