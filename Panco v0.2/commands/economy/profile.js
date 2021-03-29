const discord = require('discord.js')

const wdb = require('wio.db')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
        name: "profile",
        aliases: [],
        run: async (client, message, args) => {
        let kullanıcıpremi = wdb.fetch(`preKullanıcı_${message.author.id}`)
        let sword = await db.fetch(`sword.puan_${message.author.id}`)
        let axe = await db.fetch(`axe.puan_${message.author.id}`)
        let rod = await db.fetch(`rod.puan_${message.author.id}`)

        let dura = await db.fetch(`axedura_${message.author.id}`) || "0"
        let ddura = await db.fetch(`roddura_${message.author.id}`) || "0"
        let sura = await db.fetch(`sworddura_${message.author.id}`) || "0"

        
        if(!kullanıcıpremi)kullanıcıpremi = "Dont have premium."
        if(kullanıcıpremi)kullanıcıpremi = "Have premium."

        if(sword == null || undefined)sword = "0"
        if(axe == null || undefined)axe = "0"
        if(rod == null || undefined)rod = "0"


        message.channel.send(new discord.MessageEmbed().setDescription(`
        Your economy and other profile;

        How much you used rod: ${rod}

        How much you used sword: ${sword}

        How much you used axe: ${axe}

        How much durability items left;

        Axe:  ${dura}
        Rod: ${ddura}
        Sword: ${sura}

        
        Premium;
        ${kullanıcıpremi}
        
        `))
}
}