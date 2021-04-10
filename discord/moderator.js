// Creating a moderator for the discord guild
const Discord = require('discord.js');
const moderatorClient = new Discord.Client();

// Get filter for bad words
var Filter = require('bad-words');
const filter = new Filter();

// Indicating the not status
moderatorClient.on('ready', () => {
    console.log('Moderator Client is active!');
});

// Listen to messages 
moderatorClient.on("message", (msg) => {
    if (filter.isProfane(msg.content)) {
        msg.reply("Please refrain from using unkind words in the discord!");
        msg.delete();
    }
});

moderatorClient.on("message", (msg) => {
    if (!msg.guild) return;
    if (msg.content.startsWith('!kick')) {
        const user = msg.mentions.users.first();
        if (user) {
            const member = msg.guild.members.resolve(user);
            if (member) {
                member
                    .kick()
                    .then(() => {
                        msg.channel.send(`Successfully kicked ${user.tag}`);
                    })
                    .catch(err => {
                        msg.channel.send('I was unable to kick the member');
                        console.error(err);
                    });
            } else {
                msg.channel.send("That user isn't in this guild!");
            }
        } else {
            msg.channel.send("You didn't mention the user to kick!");
        }
    }
});


module.exports = moderatorClient;