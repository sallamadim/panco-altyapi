const Discord = require('discord.js')


const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
  name: "eval",
  aliases: [],
  run: async (client, message, args) => {

  let ownerarrays = ["629426912279789580","755325329005871144","608920145032904715"]
    if(!ownerarrays.includes(message.author.id)) return message.channel.send("you are not sallamadım/ender bitch")
    try {
      
      var code = args.join(" ");
      var evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      let Embed = new Discord.MessageEmbed()
                            .addField("** **","```js\n" + code + "```")
                            .setDescription("```js\n" + clean(evaled) + "```")
if (Embed.description.length >= 2048)
      Embed.description = Embed.description.substr(0, 2042) + "```...";
    return message.channel.send(Embed)
    } catch (err) {
      message.channel.send(`\`Error\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
}
}