const Discord = require('discord.js')
module.exports = {
    name: "ping",
    aliases: [],
    run: async (client, message, args) => {

        this.client = client
        if(this.client.ws.ping > 500) this.client = ":red_circle:"
        else if(this.client.ws.ping < 500) this.client = ":green_circle:"

        let a = Date.now() - message.createdAt
        if(a > 500) a = ":red_circle:"
        else if(a < 500) a = ":green_circle:"
        message.channel.send(
new Discord.MessageEmbed().setDescription(`
**Tip:**
> If ping is :red_circle: the ping is so much.
> Else if the ping is :green_circle: the ping is not to much.


Websocket ping: ${client.ws.ping} = ${this.client}

`)
        ).then((msg) => {
            msg.react("❌")
            })
    },
}