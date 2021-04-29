const { Discord, MessageEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {


  let yetkili = ayarlar.yetkili;
  let log = ayarlar.log;

  if (!message.member.roles.cache.has(ayarlar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("Black"));

  if (!args[0]) return message.channel.send(`Bir üye belirtmelisin.`);

  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send(`${args[0]}, adlı kişi sunucuda bulunamadı.`);
  if (kullanıcı.bot) return;

  let isim = args[1];

  if (!isim) return message.channel.send(`Bir isim belirtmelisin.`);

  let yaş = args[2];
  if (!yaş) return message.channel.send(`Bir yaş belirtmelisin.`);

  const wowo = new MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
    .setColor(`#fffff0`);
  let tag = ayarlar.tag;
  message.guild.members.cache
    .get(kullanıcı.id)
    .setNickname(`${tag} ${isim} | ${yaş}`);
  message.guild.members.cache
    .get(kullanıcı.id)
    .send(
      wowo.setDescription(
        `✩ ${message.author} tarafından ismin \`${tag} ${isim} | ${yaş}\` olarak güncellendi.`
      )
    );

  let embed2 = new MessageEmbed().setColor(`RANDOM`).setDescription(`
\`${tag} ${isim} | ${yaş}\` olarak güncellendi.
✩ İsmi Değiştirilen Kullanıcı: ${kullanıcı}
✩ İsmi Değiştiren Yetkili: ${message.author}
`);

  client.channels.cache.get(ayarlar.log).send(embed2);
  let embed3 = new MessageEmbed().setColor(`RANDOM`).setDescription(`
✩ ${kullanıcı} adlı kişinin ismi, ${message.author} tarafından değiştirildi.
`);
  message.channel.send(embed3);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "isim-değiştir"],
  permLevel: 0
};

exports.help = {
  name: "isim"
}; 
