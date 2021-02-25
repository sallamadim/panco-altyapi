const { MessageEmbed } = require('discord.js')
const { Pagination } = require('cords-handler')
module.exports = {
    name: "help",
    aliases: [],
    run: async (client, message, args) => {
        if(!args[0]) {
    var economy = new MessageEmbed()
    .setTitle("Economy help menu;")
    .setDescription(`
     \`/daily\` => Get your daily award.
     \`/balance\` => See your balance.
     \`/inventory\` => See your inventory.
     \`/profile\` => See your economy profile.
     \`/store\` => See shop.
     \`/transfer\` => Transfer minerals or fishes to another user.
     \`/buy\` => Buy things from store.
     \`/axe\` => Use axe.
     \`/rod\` => Use rod.
     \`/sword\` => Use sword.
     \`/trade\` => Trade your fishes with bot! 
    `).setFooter("Type: panco help command to get more information for command.")
    var bot = new MessageEmbed()
    .setTitle("Bot help menu;")
    .setDescription(`
    \`/stats\` => See bot stats.
    \`/ping\` => See bots ping.
    `).setFooter("Type: panco help command to get more information for command.")
    var fun = new MessageEmbed()
    .setTitle("Fun help menu;")
    .setDescription(`
    \`/cat\` => Show random cats.
    \`/dog\` => Show random dogs.
    \`/howgay\` => :rainbow_flag:.
    \`/hug\` => Hug someone.
    \`/rate\` => See how much you love panco :heart:.
    \`/pat\` => Pat someone.
    \`/waifurate\` => How much you love waifus?
    `).setFooter("Type: panco help command to get more information for command.")
   var giveaway = new MessageEmbed()
   .setTitle("Giveaway help menu;")
   .setDescription(`
   \`/start\` => Start a giveaway.
   \`/reroll\` => Reroll a giveaway.
   \`/end\` => End a giveaway.
   `) .setFooter("Type: panco help command to get more information for command.")
   var moderation = new MessageEmbed()
   .setTitle("Moderation help menu;")
   .setDescription(`
   \`/ban\` => Ban a member.
   \`/banlist\` => Show ban list.
   \`/channel-guard\` => (premium) enables or disables the system, no1 can delete a channel.
   \`/lock\` => Lock channel.
   \`/nuke\` => Nuke channel.
   \`/oto-role-close\` => Close oto role.
   \`/oto-role-message\` => Changes oto role message.
   \`/oto-role-set\` => Sets oto role.
   \`/unban\` => Unban a member.
   \`/unlock\` => Unlock channel.
   `).setFooter("Type: panco help command to get more information for command.")
   var other = new MessageEmbed()
   .setTitle("Other commands;")
   .setDescription(`
   \`/eval\` => (only for owners) Can test a code!
   \`/premium\` => To be a premium member.
   `).setFooter("Type: panco help command to get more information for command.")
   var pages = [economy,bot,fun,giveaway,moderation,other]
   let pagination = new Pagination(client)
pagination.setPages(pages)
pagination.setTimeout("50m")
pagination.setMessage(message)
pagination.start()
        }
        else {
if (args[0]) { 
    if (!client.commands.has(args[0])) return message.channel.send("Cannot find that command."); 
    let cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0])); 
    let embed = new MessageEmbed() 
    .setColor("RANDOM") 
    .setTitle(`**Command Information**`)
     .addField("Command Name", cmd.name) 
     .addField("Command Aliases", cmd.aliases.join(",") || "None.") 
     message.channel.send(embed)
}
        }
}
}