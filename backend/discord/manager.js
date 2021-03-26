// Creating a moderator for the discord guild
const Discord = require('discord.js');
const managerClient = new Discord.Client();

const mongoose = require("mongoose");
const { roomSchema } = require('../models/rooms');
const Room = mongoose.model("Room", roomSchema);

require("dotenv").config();

managerClient.on("ready", () => {
    setInterval(async () => {
        const channels = await getOldChannels();
        const badDbIds = [];
        const badDiscordIds = [];
        for (let channel of channels) {
            let channelStatus = undefined
            if ((channel.type == "text")) {
                channelStatus = await isTextChannelActive(channel);
                if (channelStatus == false) {
                    badDbIds.push(channel["_id"]);
                    badDiscordIds.push(channel["discord_channel_id"]);
                }
            }
            else if ((channel.type == "voice")) {
                channelStatus = await isVoiceChannelActive(channel);
                if (channelStatus == false) {
                    badDbIds.push(channel["_id"]);
                    badDiscordIds.push(channel["discord_channel_id"]);
                }
            }
        }
        await manageDBDelete(badDbIds);
        await manageDiscordDelete(badDiscordIds);
    }, 24 * 60 * 60 * 1000);
});

async function getOldChannels() {
    const rooms = await Room
        .find().sort({ created_at: 1 });
    return rooms;
}

async function isTextChannelActive(dbChannel) {
    // Check if the last message in the channel is over 3 days ago
    let status = true;
    var threeDays = 3 * 24 * 60 * 60 * 1000;
    let guild = await managerClient.guilds.fetch(process.env.GUILD_ID);
    let channel = await guild.channels.cache.get(dbChannel.discord_channel_id);
    await channel.messages.fetch({ limit: 1 })
        .then(messages => {
            let lastMessage = messages.first();
            if ((Date.now() - lastMessage.createdAt) >= threeDays) {
                status = false;
            }
        })
        .catch(() => { status = true });
    return status;
}

async function isVoiceChannelActive(dbChannel) {
    // Check number of people currently in the chat
    let status = true;
    let guild = await managerClient.guilds.fetch(process.env.GUILD_ID);
    let channel = await guild.channels.cache.get(dbChannel.discord_channel_id);
    if (channel.members.size < 1) {
        status = false
    }
    return status;
}

async function manageDBDelete(badDbIds) {
    try {
        console.log("Database delete");
        await Room.deleteMany({
            _id: {
                $in: badDbIds
            }
        });
    } catch (err) {
        console.log(`Database Delete Failed! ${err.message}`);
    }
}

async function manageDiscordDelete(badDiscordIds) {
    try {
        console.log("Discord delete");
        let guild = await managerClient.guilds.fetch(process.env.GUILD_ID);
        for (let channelId of badDiscordIds) {
            let channel = await guild.channels.cache.get(channelId);
            channel.delete();
        }
    } catch (err) {
        console.log(`Discord Delete Failed! ${err.message}`);
    }
}


module.exports = managerClient;