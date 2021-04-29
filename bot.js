const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
var Jimp = require("jimp");
const log = message => {
  console.log(`{ ${message} } `);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yükleniyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(ayarlar.token);

/////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
  const moment = require("moment");
  const kanal = ayarlar.kanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const embed = new Discord.MessageEmbed();

var üyesayısı = msg.guild.members.cache.size.toString().replace(/ /g, "    ")
var üs = üyesayısı.match(/([0-9])/g)
üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs) {
üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
return {
  '0': `<a:sifir:817810687295488021>`,
  '1': `<a:bir:817810658107457536>`,
  '2': `<a:iki:817810729239052318>`,
  '3': `<a:uc:817810760201404478>`,
  '4': `<a:dort:817810792660992050>`,                       
  '5': `<a:bes:817810822113656832>`,
  '6': `<a:alti:817810853565956179>`,
  '7': `<a:yedi:817810888677523457>`,
  '8': `<a:sekiz:817810921115090975>`,
  '9': `<a:dokuz:817810948198236162>`}[d];})}

  var kontrol;
  if (kurulus < 1209600000) kontrol = "Kullanıcı **Şüpheli!**";
  if (kurulus > 1209600000) kontrol = "Kullanıcı **Güvenli!**";
  moment.locale("tr");
  let kanal1 = client.channels.cache.find(cc => cc.id === kanal);
  let giris = new Discord.MessageEmbed()
    .setDescription(`

Sunucumuza hoş geldin! ${member} 
 
   Hesabın ${moment(member.user.createdAt).format("DD MMMM YYYY dddd")} tarihinde oluşturulmuş.

     Sunucu kurallarımız <#${ayarlar.kurallar}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
 
   **Seninle beraber** ${member.guild.memberCount} **kişi olduk!**

Tagımızı alarak bizlere destek olabilirsin \` ${ayarlar.tag} \` Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor yetkililerimiz seninle ilgilenecektir!
`)
    .setColor(`GREEN`)
    .setImage("https://cdn.discordapp.com/attachments/809177858660368384/809871134622220352/welcome_gif.gif")
    .setTimestamp();

  client.channels.cache
    .find(ccc => ccc.id === kanal)
    .send(`<@&${ayarlar.yetkili}> & ${member}`);
  client.channels.cache.find(cccc => cccc.id === kanal).send(giris);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                            OTOROL VE OTOİSİM                    //


client.on("guildMemberAdd", member => {
  let tag = ayarlar.tag
  member.setNickname(`${tag} Kayıtsız`);
});



client.on(`guildMemberAdd`, async member => {
  let kayıtsız = ayarlar.kayıtsız;
  member.roles.add(kayıtsız);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//                        OTO TAG                              //
 
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = ayarlar.tag;
  const sunucu = ayarlar.sunucu;
  const kanal = ayarlar.log
  const rol = ayarlar.taglı

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim!`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser}, Sunucumuzda ${tag} Tagımızı Aldığın İçin <@&${rol}> Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım!`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser}, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin <@&${rol}> Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }   
}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//                         ŞÜPHELİ HESAP KONTROL                          //

client.on('guildMemberAdd',async member => {
  let suphelikisi = client.users.cache.get(member.id);
    const acilis = new Date().cache.getTime() - suphelikisi.createdAt.cache.getTime();   
    if (acilis < 259200) 
  member.roles.add("şüpheli id")
  member.roles.remove("kayıtsız")
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//                      BOTU SESE SOKMA                        //

client.on("ready", async () => {
  client.channels.cache.get(ayarlar.botkanal).join();
}) 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
  let sunucuid = ayarlar.sunucu; 
  let tag = ayarlar.tag;
  let rol = ayarlar.taglı; 
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor(GREEN)
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden!`)
      .setTimestamp()
     client.channels.cache.get(ayarlar.log).send(tagalma)
}
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.cache.get(ayarlar.suphelicezali) 
   var kayıtsız = member.guild.roles.cache.get(ayarlar.kayıtsız) 
   member.roles.add(rol)
   member.roles.remove(kayıtsız)

member.user.send(`Selam dostum! Hesabın \`7 günden önce açıldığı için\` **${message.guild.name}** sunucusunda cezalıya düştün!`)

const ugureylul = new Discord.MessageEmbed()
.setColor(GREEN)
.setDescription(`<@${member.id}> adlı kişi hesabı 7 günden önce açıldığı için cezalıya atıldı.`)
.setTimestamp()
client.channels.cache.get(ayarlar.kanal).send(ugureylul)
setTimeout(() => {

}, 1000)


   }
        else {

        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') { 
    msg.channel.send(` ${ayarlar.tag} `); 
  }
}); 

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!tag') { 
    msg.channel.send(` ${ayarlar.tag} `); 
  }
}); 

client.on('message', msg => {
  if (msg.content.toLowerCase() === '.tag') { 
    msg.channel.send(` ${ayarlar.tag} `); 
  }
}); 

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') { 
    msg.reply('Aleyküm selam, hoşgeldin dostum!'); 
  }
}); 