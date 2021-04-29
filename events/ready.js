const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

module.exports = async client => {
  var oyun = [ayarlar.botdurum,];

  setInterval(async () => {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(oyun[random], { type: "WATCHING" }); //listening, playing olarak değiştirilebilir
    }, 25000);
  client.user.setStatus("dnd"); //online, offline, idle olarak değiştirilebilir

  console.log('Giriş yapıldı.')
};