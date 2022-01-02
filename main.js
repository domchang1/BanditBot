const { Client, Intents, MessageSelectMenu, MessageFlags } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token} = require('./config.json');
const fetch = require("node-fetch");

function getWord(){
  return fetch("https://random-word-api.herokuapp.com/word?number=1")
  .then(res => {
    return res.text()
  })
  .then(data => {
    return data.substring(2,data.length-2)
  })
  .catch(err =>{
    return err
  })
}
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
  if (msg.author.bot) return

  if (msg.content === 'hi'){
    msg.channel.send("Hi!");
  }
  else if (msg.content === 'word'){
    getWord().then(word => msg.channel.send(word))
  }
})

client.login(token) //make sure to create your own .env file to store the bot token