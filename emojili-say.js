const Discord = require("discord.js");
const { oneLine, stripIndents } = require('common-tags');
module.exports.run = async (client, message, args) => {


let guild = ayarlar.sunucu; // SUNUCU ID
const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
let count = 0;
for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
var msg = message;
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
  
  
var sessayı = count.toString().replace(/ /g, "  ")
var üs2 = sessayı.match(/([0-9])/g)
sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs2) {
sessayı = sessayı.replace(/([0-9])/g, d => {
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


  
var cevirimici = message.guild.members.cache.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
var üs4= cevirimici.match(/([0-9])/g)
cevirimici = cevirimici.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs4) {
cevirimici = cevirimici.replace(/([0-9])/g, d => {
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

  
  
  
var booster = message.guild.roles.cache.get(ayarlar.booster).members.size
var booster = booster.toString().replace(/ /g, "    ")
var üs5 = booster.match(/([0-9])/g)
booster = booster.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs5) {
booster = booster.replace(/([0-9])/g, d => {
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


  
const embed1 = new Discord.MessageEmbed()
.setColor('0x0088ff')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
 .setDescription(`
<a:elmas:820744559288909904> **Sunucumuzda toplam** ${üyesayısı} **kişiyiz.** 
<a:deasn:820746955235262575> **Sunucumuzda toplam** ${cevirimici} **üyemiz çevrimiçi.** 
<a:sesli:819989609093267466> **Sesli kanallarında** ${sessayı} **üyemiz sohbet ediyor.**
<a:boost:820743779601743913> **Sunucumuzda toplam** ${booster} **booster destekçimiz bulunmakta.**`)
message.channel.send(embed1);
  
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["total",'toplam','say','info'],
  permLevel: 0
};
exports.help = {
  name: 'say'
}