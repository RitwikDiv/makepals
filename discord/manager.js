// Creating a moderator for the discord guild
const Discord = require('discord.js');
const managerClient = new Discord.Client();

const mongoose = require('mongoose');
const { roomSchema } = require('../models/rooms');
const Room = mongoose.model('Room', roomSchema);

require('dotenv').config();

managerClient.on('ready', async () => {
	console.log('Cleaning is active!');
	var loop = setInterval(async () => {
		const channels = await getOldChannels();
		const badDbIds = [];
		const badDiscordIds = [];
		for (let channel of channels) {
			channelStatus = await isChannelActive(channel);
			if (channelStatus == false) {
				badDbIds.push(channel['_id']);
				badDiscordIds.push(channel['discord_channel_id']);
			}
		}
		await manageDBDelete(badDbIds);
		await manageDiscordDelete(badDiscordIds);
	}, 15 * 60 * 1000);
});

async function getOldChannels() {
	const rooms = await Room.find().sort({ created_at: 1 });
	return rooms;
}

async function isChannelActive(dbChannel) {
	let status = true;
	var oneDay = 2 * 24 * 60 * 60 * 1000;
	let guild = await managerClient.guilds.fetch(process.env.GUILD_ID);
	let channel = await guild.channels.cache.get(dbChannel.discord_channel_id);
	await channel.messages
		.fetch({ limit: 1 })
		.then((messages) => {
			let lastMessage = messages.first();
			if (Date.now() - lastMessage.createdAt >= oneDay) {
				status = false;
			}
		})
		.catch(() => {
			status = true;
		});
	return status;
}

async function manageDBDelete(badDbIds) {
	try {
		await Room.deleteMany({
			_id: {
				$in: badDbIds,
			},
		});
	} catch (err) {
		console.error(`Database Delete Failed! ${err.message}`);
	}
}

async function manageDiscordDelete(badDiscordIds) {
	try {
		console.log('Discord delete');
		let guild = await managerClient.guilds.fetch(process.env.GUILD_ID);
		for (let channelId of badDiscordIds) {
			let channel = await guild.channels.cache.get(channelId);
			channel.delete();
		}
	} catch (err) {
		console.error(`Discord Delete Failed! ${err.message}`);
	}
}

module.exports = managerClient;
