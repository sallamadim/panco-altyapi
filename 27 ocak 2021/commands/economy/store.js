

const Discord=require('discord.js')
const ms=require('parse-ms')
module.exports = {
  name: "store",
  aliases: ["shop"],
  run: async (client, message, args) => {

    let pages = [
    `**Item Shop**
    
    **Fishing Rod:** \`2\` string and \`3\` sticks. *You can use it to fishing.*

    **Sword:** \`50\` irons. *You can use it for getting string and much more.*

    **Axe:** \`30\` irons. *You can use it for get stick and much more.*

    To buy that items type: \`buy sword/fishing-rod\`
    `,
    
    `**Minerals Shop**
    

    <:altin:786961288562475039> Golds <:altin:786961288562475039>

    <:altin:786961288562475039> To buy \`1\` gold you need 40 irons.
    
    <a:elmas:786961212126134312> Diamonds <a:elmas:786961212126134312>

    <a:elmas:786961212126134312> To buy \`1\` diamond you need 32 golds.

    <:zumrut:786961762586460190> Emeralds <:zumrut:786961762586460190>

    <:zumrut:786961762586460190> To buy \`1\` emerald you need 64 diamonds.


    Type: \`buy <mineralname> <amount>\` to buy.

    `
    
    ];
let page = 1;

const embed = new Discord.MessageEmbed()
.setColor('PURPLE')
.setFooter(`Page ${page} / ${pages.length}`)
.setDescription(pages[page-1])
message.channel.send(embed).then(msg => {

msg.react('⬅')
.then(r => {
msg.react('➡')


const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });

forwards.on('collect', r => {
  if(page === pages.length) return;
  page++;
  embed.setDescription(pages[page-1]);
  embed.setColor('PURPLE')
  embed.setFooter(`Page ${page} / ${pages.length}`)
  msg.edit(embed)
})
backwards.on('collect', r => {
  if(page === 1) return;
  page--;
  embed.setColor('PURPLE')
  embed.setDescription(pages[page-1]);
  embed.setFooter(`Page ${page} / ${pages.length}`)
  msg.edit(embed)
})

})
})
}
}