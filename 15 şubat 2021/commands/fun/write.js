const Discord = require('discord.js')   
module.exports = {
  name: "write",
  aliases: [],
  run: async (client, message, args) => {
    let text = args.slice(0).join(' ')
    if(!text ) return message.channel.send("Specify a text.")

    if(text.length > 45) {
      return message.channel.send("Text can be 45 characters maximum!")
    }
    const Canvas = require("canvas")
    const canvas = Canvas.createCanvas(400, 69);
    const bg = await Canvas.loadImage(`./img/image_1.png`);
    const img = await Canvas.loadImage(message.author.avatarURL({dynamic: false, format: "jpg", size: 32}));
    const ctx = canvas.getContext(`2d`)
    ctx.font = '13px Sans Not-Rotated';
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 3, 34)
    ctx.fillText(message.author.username, 4, 28)
    ctx.fillText(text, 45, 50)
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'write.png');
    message.channel.send(attachment);



  }}