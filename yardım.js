const Discord = require('discord.js');

exports.run = (client, message, args) => {
 const embed = new Discord.MessageEmbed()


 .setAuthor(`${client.user.username} Yardım Menüsü`,client.user.avatarURL())
 .setThumbnail(message.author.avatarURL())
 .setColor('RANDOM')
 .setDescription(`
 > **erkek** ・ Etiketlediğiniz üyeyi __erkek__ olarak kayıt eder.

 > **kız** ・ Etiketlediğiniz üyeyi __kız__ olarak kayıt eder.

 > **kayıtsız** ・ Etiketlediğiniz üyeyi __kayıtsıza__ atar.

 > **isim** ・ Etiketlediğiniz üyenin __isim ve yaşını__ değiştirirsiniz.
 
 > **say** ・ Sunucu istatistiklerini görüntülersiniz.

 > **yardım** ・ Şuan ki menüyü görüntülersiniz.`)
 .setFooter(`\📚 Yardım Menüsü`)
    .setTimestamp()
    .setImage("https://cdn.discordapp.com/attachments/803298892997328906/810547088961699870/yardim.gif")
message.channel.send(embed) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: '',
  usage: 'yardım'
};