
const discord = require('discord.js')

const { mongo } = require('../../config/config.json')
const { Database } = require('g9db')
const db = new Database(mongo,"pancodb")
module.exports = {
  name: "oto-role-set",
  aliases: [],
  run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new discord.MessageEmbed().setDescription(`
      ${client.emotes.error} | You dont have enough permission for this command.
      `)
    );
  if (message.guild)
var prefix = "/"


  let rol = message.mentions.roles.first();
  let kanal = message.mentions.channels.first();

  if (!rol)
    return message.channel
      .send(new discord.MessageEmbed().setDescription(`
      ${client.emotes.error} | You dont mention a role.
      Please use: oto-role-set @role #channel

      Note:**If my role is lower than the one you tagged, I can't give it.**
      
      `));
  if (!kanal)
    return message.channel.send(
      new discord.MessageEmbed().setDescription(`
      ${client.emotes.error} | You dont mention a channel.
      Please use: oto-role-set @role #channel

      Note:**If I don't have write permission on the channel, I can't write, on the channel, I'll get an error.**
      `)
    );

  message.channel.send(new discord.MessageEmbed().setDescription(`
  ${client.emotes.success} | System has been set to database.
        System information;
        Role: ${rol}
        Channel: ${kanal}
  
Note:
> If you dont set oto role message,
> I will use my currently message.
  `));

  await db.set(`otok_${message.guild.id}`, kanal.id);
  await db.set(`otorol_${message.guild.id}`, rol.id);
      }
            }