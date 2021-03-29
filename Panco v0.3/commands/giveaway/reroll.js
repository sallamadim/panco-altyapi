const ms = require('ms')
const discord = require('discord.js')
module.exports = {
    name: "reroll",
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
                return message.channel.send(new discord.MessageEmbed().setDescription(`
                ${client.emotes.error} | You need to specify a valid message id. 
                `));
            }
        
            
            let giveaway = 
            
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
        
            
            if(!giveaway){
                return message.channel.send(new discord.MessageEmbed().setDescription(`
                ${client.emotes.error} | Unable to find giveaway for:

                    \`${args.join(' ')}\`
                `));
            }
        
            
            client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                
                message.channel.send(message.channel.send(new discord.MessageEmbed().setDescription(`
                ${client.emotes.error} | Giveaway rerolled. 
                `)));
            })
            .catch((e) => {
                if(e.startsWith(`${client.emotes.error} | Giveaway with message ID ${giveaway.messageID} is not ended.`)){
                    message.channel.send(message.channel.send(new discord.MessageEmbed().setDescription(`
                    ${client.emotes.error} | This giveaway is not ended.
                    `)));
                } else {
                    console.error(e);
                    message.channel.send(new discord.MessageEmbed().setDescription(`
                    ${client.emotes.error} | An error has been occured.
                    `));
                }
            });

        }


    }
}