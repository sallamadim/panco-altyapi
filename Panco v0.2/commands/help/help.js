const { MessageEmbed } = require('discord.js')
const { Pagination } = require('cords-handler')

const { mongo, owner } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
    name: "help",
    aliases: [],
    run: async (client, message, args) => {
        const sec = args[0]
        if(!sec) {
            return message.channel.send(new MessageEmbed().setDescription(`
            ${client.emotes.error} You need to specify a help command.

            Examples:
\`\`\`
panco help bot => Bot commands,
panco help economy => Economy commands,
panco help giveaway => Giveaway commands,
panco help fun => Fun commands,
panco help level-system => Level system commands,
panco help moderation => Moderation commands,
panco help music => Music commands,
panco help owner => Owner commands.
\`\`\`            
            `))
        } else if(sec == "bot") {
            return message.channel.send(new MessageEmbed().setTitle(`Commands for bot;`).setDescription(`
panco ping
panco server-info
panco stats
            `).setFooter(`{} are required, [] optional.`))
        } else if(sec == "economy") {
            return message.channel.send(new MessageEmbed().setTitle(`Commands for economy;`).setDescription(`
panco axe
panco balance [user]
panco buy {thing} [amount]
panco daily
panco inventory
panco profile
panco rod
panco slot {mineral} {amount}
panco store
panco sword
panco trade {fish name} [amount]
panco transfer {user} {mineral/fish} {amount}
            `).setFooter(`{} required, [] optional.`))
        } else if(sec == "giveaway") {
            return message.channel.send(new MessageEmbed().setTitle(`Commands for giveaway;`).setDescription(`
            panco start {channel} {time} {winner} {prize}
            panco end {giveaway message id}
            panco reroll {giveaway message id}
            `).setFooter(`{} required, [] optional.`))
        }
        
        else if(sec == "fun") {
            return message.channel.send(new MessageEmbed().setTitle(`Commands for fun;`).setDescription(`
            panco affect {user}
            panco burn {user}
            panco changemymind {text}
            panco clyde {text}
            panco dog
            panco eject {user}
            panco gay {user}
            panco headpat
            panco howgay [user]
            panco hug {user}
            panco pancorate [user]
            panco pat {user}
            panco waifurate [user]
            panco youtube {text}
            `).setFooter(`{} are required, [] optional.`))
        } else if(sec == "level-system") {
            return message.channel.send(new MessageEmbed().setTitle(`Commands for giveaway;`).setDescription(`
            panco level-channel set {channel}
            panco level-channel close
            panco rank
            panco rep {user}
            `).setFooter(`{} required, [] optional.`))
        } else if(sec == "moderation") {
            return message.channel.send(new MessageEmbed().setTitle(`Commands for giveaway;`).setDescription(`
            panco ban {user} {reason}
            panco banlist
            panco channel-guard open
            panco channel-guard close
            panco lock [channel]
            panco nuke
            panco oto-role-close
            panco oto-role-message {message}
            panco oto-role-set {role} {channel}
            panco role add {user} {role}
            panco role remove {user} {role}
            panco role create {role name}
            panco role delete {role}
            panco role copy {role}
            `).setFooter(`{} required, [] optional.`))
        } else if(sec == "music") {
            return message.channel.send(new MessageEmbed().setTitle(`Commands for giveaway;`).setDescription(`
            panco clear-queue
            panco filter {filter}
            panco loop {queue or song}
            panco np
            panco pause
            panco play {name or url}
            panco queue
            panco resume
            panco shuffle
            panco skip
            panco stop
            panco volume {volume}
            panco w-filters
            `).setFooter(`{} required, [] optional.`))
        } else if(sec == "owner") {
            return message.channel.send(new MessageEmbed().setTitle(`Commands for giveaway;`).setDescription(`
            panco premium {un-premium} {user}
            panco premium {delete} {code / user}
            panco premium {add-premium} {user}
            panco premium {make-code}
            panco premium {delete-code} {code}
            panco premium {premium-list}
            panco premium {code-list}
            panco eval {code}

            If you are not my owner you can use;
            panco premium {use-code} {code} 
            Only.

            `).setFooter(`{} required, [] optional.`)) 
        }
}
}