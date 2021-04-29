const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has(ayarlar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("Black"));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().addField("Hatalı Kullanım!",`Lütfen bir kullanıcı etiketleyiniz!`).setColor("RANDOM"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  member.roles.set(ayarlar.kayıtsız)




  let embed = new Discord.MessageEmbed() 
  .setColor("RANDOM")
  .setTimestamp()
  .addField(`Kayıtsıza atma işlemi başarılı!`, `${member} **üyesi,** ${message.author} **tarafından kayıtsıza atıldı!**`) 
  .setFooter(`Komutu Kullanan Yetkili: ${message.author.username}` ,message.author.avatarURL({dynamic: true }))
  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız" , "kayıtsız"],
  permLevel: 0
}
exports.help = {
  name: 'Kayıtsız',

}