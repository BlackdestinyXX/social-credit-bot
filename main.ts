const { Client, Intents, MessageEmbed } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const { accepted, rejected } = require("./phrases")
const socialCreditChannel = "social credit channel here"
const fs = require("fs")
const database = require("./database.json")

setInterval(function() {
  fs.writeFile('./database.json', JSON.stringify(database), function(err: any) {
      if(err) console.log(err)
  })
}, 60000)

client.on("messageCreate", (message: { content: string; mentions: { users: { first: () => any } }; author: { id: string | number }; channel: { send: (arg0: string) => void } }) => {

  if(message.content.startsWith("ch!social-credit")) {
    let user = message.mentions.users.first()
    if(!user) {
      if(!database[message.author.id]) {
        message.channel.send("Hai 0 social credit")
      } else {
        message.channel.send("Hai " + database[message.author.id] + " social credit")
      }
    } else {
      if(!database[user.id]) {
        message.channel.send("<@ " + user.id + "> ha 0 social credit")
      } else {
        message.channel.send("<@ " + user.id + "> ha " + database[user.id] + " social credit")
      }
    }
  }

  if(accepted.includes(message.content.toLowerCase())) {

    if(!database[message.author.id]) {
      database[message.author.id] = 1
    } else {
      database[message.author.id] += 1
    }

    return client.channels.cache.get(socialCreditChannel).send(`<@${message.author.id}>\n+ 1 social credit`);
  }

  if(rejected.includes(message.content.toLowerCase())) {

    if(!database[message.author.id]) {
      database[message.author.id] = -1
    } else {
      database[message.author.id] -= 1
    }

    return client.channels.cache.get(socialCreditChannel).send(`<@${message.author.id}>\n- 1 social credit`);
  }

})

client.login("token here");