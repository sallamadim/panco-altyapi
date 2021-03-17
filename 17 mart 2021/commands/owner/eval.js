const Discord = require('discord.js')


const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
  name: "eval",
  aliases: [],
  /**
* @param {Discord.Message} message
* @param {Discord.Client} client
* @param {String[]} args
*/
  run: async (client, message, args) => {
    if(message.author.id !== "755325329005871144") return   message.reply("you are not sallamadım bitch");
    try {
   
   
      var code = args.join(" ");
      var evaled = eval(code);
      let tip = typeof(clean(evaled))
   
      evaled = require("util").inspect(evaled);
     
   
      if(evaled.length>1000){
        let Embed = new Discord.MessageEmbed()
      .addField("Code;","```js\n" + code + "```")
      .addField("Result;", "```js\n" +evaled.slice(0,1000) + "...```")
      .addField('Kind;', `\`${tip}\``, true)
      .addField('Length;', `\`${evaled.length}\``, true)
      .addField('Ping;', ` \`0.0${client.ws.ping} ms\` `, true)
   
       message.reply(Embed).then(async function(mesajzz) {
        const filter = (reaction, user) => user.id === message.author.id;
        await mesajzz.react("✅").catch(function() {})
        await mesajzz.react("❌").catch(function() {})
        await mesajzz.react("↩️").catch(function() {})
        var reactions = mesajzz.createReactionCollector(filter);
     
        reactions.on("collect", async function(reaction) {
          if (reaction.emoji.name === "✅") {
            mesajzz.delete()
      message.delete()
      }
        });
        reactions.on("collect", async function(reaction) {
          if (reaction.emoji.name === "❌") {
            mesajzz.edit(new Discord.MessageEmbed()
      .addField("Code;","```diff\n- This eval was hidden by "+message.member.displayName+".```")
      .addField("Result;", "```diff\n- This eval was hidden by "+message.member.displayName+".```")
      .addField('Kind;', `\`Hidden\``, true)
      .addField('Length;', `\`Hidden\``, true)
      .addField('Ping;', ` \`Hidden\` `, true))
          }
        });
        reactions.on("collect", async function(reaction) {
          if (reaction.emoji.name === "↩️") {
            mesajzz.edit(Embed)
            reaction.users.remove(message.author.id)
          }
        });
      });
     
      }else{
   
      let Embed = new Discord.MessageEmbed()
      .addField("Code;","```js\n" + code + "```")
      .addField("Result;", "```js\n" + clean(evaled) + "```")
      .addField('Kind;', `\`${tip}\``, true)
      .addField('Length;', `\`${evaled.length}\``, true)
      .addField('Ping;', ` \`0.0${client.ws.ping} ms\` `, true)
   
           message.reply(Embed).then(async function(mesajzz) {
        const filter = (reaction, user) => user.id === message.author.id;
        await mesajzz.react("✅").catch(function() {})
        await mesajzz.react("❌").catch(function() {})
        await mesajzz.react("↩️").catch(function() {})
        var reactions = mesajzz.createReactionCollector(filter);
     
        reactions.on("collect", async function(reaction) {
          if (reaction.emoji.name === "✅") {
            mesajzz.delete()
      message.delete()
    }
        });
        reactions.on("collect", async function(reaction) {
          if (reaction.emoji.name === "❌") {
            mesajzz.edit(new Discord.MessageEmbed()
      .addField("Code;","```diff\n- This eval was hidden by "+message.member.displayName+".```")
      .addField("Result;", "```diff\n- This eval was hidden by "+message.member.displayName+".```")
      .addField('Kind;', `\`Hidden\``, true)
      .addField('Length;', `\`Hidden\``, true)
      .addField('Ping;', ` \`Hidden\` `, true))
      reaction.users.remove(message.author.id)
    }
        });
        reactions.on("collect", async function(reaction) {
          if (reaction.emoji.name === "↩️") {
            mesajzz.edit(Embed)
            reaction.users.remove(message.author.id)
          }
        });
      });
   
     
      }
     
    }
   
  catch (err) {
           message.reply(`Error; \n\n\`\`\`xl\n${clean(err)}\n\`\`\``);
    }
   
   
   
  function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
    return text;
  }
}
}