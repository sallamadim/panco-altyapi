const Discord = require("discord.js");
const talkedRecently = new Set();
module.exports = {
    name: "banlist",
    aliases: [],
    run: async (client, message, args) => {

        const bans = new Map();
        message.guild.fetchBans().then(g => {
            bans[g.id] = g;
            let banlist = (`${bans[g.id].map(ge => `\n (${ge.user.tag}) (${ge.user.id})`).join('\n')}`)
                    try {     
            let pancoembed = new Discord.MessageEmbed()
.setColor('#0070FF')
            .setDescription(`${client.emotes.error} | There is no banned member.`)
            .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : "https://images-ext-2.discord.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discord.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
        
            if(banlist.length === 0) return message.channel.send(pancoembed)
            const embed = new Discord.MessageEmbed()
                .setDescription(banlist)
                .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : "https://images-ext-2.discord.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discord.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
            .setColor('#0070FF')
            message.channel.send(embed)
                  } catch (err) {
    const embed = new Discord.MessageEmbed()
        .addField(`${client.emotes.error} | An error has occurred.`,'I cant show the ban list, because of the discord api.')
        .setColor('RED')
    
        .setTimestamp()
    message.channel.send(embed)
                  }

    });
    },}