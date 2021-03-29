const ms = require('ms')
const discord = require('discord.js')

module.exports = {
    name: "start",
    aliases: [],
    run: async (client, message, args) => {

if(!message.member.hasPermission('ADMINISTRATOR')){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | You dont have permission.
    `));
}


let giveawayChannel = message.mentions.channels.first();

if(!giveawayChannel){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | Mention a channel.

    Example use: \`start #giveaways 1d 10 Nitro Classic\`
    `));
}


let giveawayDuration = args[1];

if(!giveawayDuration || isNaN(ms(giveawayDuration))){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | You need to specify valid duration.

    Example use: \`start #giveaways 1d 10 Nitro Classic\`
    `));
}


let giveawayNumberWinners = args[2];

if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | Please specify a valid winner(s).

    Example use: \`start #giveaways 1d 10 Nitro Classic\`
    `));
}


let giveawayPrize = args.slice(3).join(' ');

if(!giveawayPrize){
    return message.channel.send(new discord.MessageEmbed().setDescription(`
    ${client.emotes.error} | You need to specify a prize.

    Example use: \`start #giveaways 1d 10 Nitro Classic\`
    `));
}


client.giveawaysManager.start(giveawayChannel, {
    
    time: ms(giveawayDuration),
    
    prize: giveawayPrize,
    
    winnerCount: giveawayNumberWinners,
    
    hostedBy: message.author,
    
    messages: {
        giveaway: "@everyone\n\n"+"<a:cekilis:797071398878183464> **GIVEAWAY STARTED** <a:cekilis:797071398878183464>",
        giveawayEnded: "@everyone\n\n"+"<a:cekilis:797071398878183464> **GIVEAWAY ENDED** <a:cekilis:797071398878183464>",
        timeRemaining: "Time remaining: **{duration}**!",
        inviteToParticipate: "React with <a:cekilis:797071398878183464> to join!",
        winMessage: "Congratulations, {winners}!\n\nYou won **{prize}**!",
        embedFooter: "Panco, giveaway system..",
        noWinner: "Giveaway cancelled, no valid participations.",
        hostedBy: "Hosted by: {user}!",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false
        }
    }
});

message.channel.send(new discord.MessageEmbed().setDescription(`
${client.emotes.success} | Giveaway started at: ${giveawayChannel}
`));
}
}