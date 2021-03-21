// Loading required modules
const express = require('express');
const Joi = require('joi');
const mongoose = require("mongoose");
require("dotenv").config();

// Import the discord.js module and create a client
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_SECRET);

client.on('ready', () => {
    console.log("Discord Client is listening!");
});


// Import results from models
const { roomSchema, validateRoom } = require('../models/rooms');
const Room = mongoose.model("Room", roomSchema);

// Initialize the router
const router = express.Router();

// Get all rooms
router.get('/', async (req, res) => {
    const rooms = await Room
        .find()
        .sort({ title: 1 });
    res.send(rooms);
});

// Create a room 
router.post('/', async (req, res) => {
    const { error } = validateRoom(req.body);
    if (error) return res.sendStatus(400).send(error.details[0].message);
    var link, discord_channel_id;
    // Create a discord room
    try {
        let guild = await client.guilds.fetch(process.env.GUILD_ID);
        let channel = await guild.channels.create(req.body.title, {
            type: req.body.type,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
                }
            ],
        });
        discord_channel_id = await channel.id;
        link = await channel.createInvite({ permissions: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] });
        let category = await guild.channels.cache.find(c => c.name == req.body.category && c.type == "category");
        await channel.setParent(category.id, { lockPermissions: false });
        if (req.body.type == 'text') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Welcome to ${req.body.title} room!`)
                .setColor(Math.floor(Math.random() * 16777215).toString(16))
                .setDescription(req.body.desc);
            await channel.send(embed);
        }
    } catch (e) {
        res.sendStatus(500).send(e);
    }
    // Add the room to the database
    let room = new Room({
        title: req.body.title,
        desc: req.body.desc,
        type: req.body.type,
        category: req.body.category,
        channel_link: `https://discord.gg/${link.code}`,
        discord_channel_id: discord_channel_id
    });
    room = await room.save();
    res.send(room);
});

// Get one room
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const room = await Room.findById(id);
    if (!room) return res.status(404).send(`Couldn't find room with id: ${id}`);
    res.send(room);
});

// Delete a room
router.delete('/:id', async (req, res) => {
    const room = await Room.findByIdAndRemove(req.params.id);
    if (!room) return res.status(404).send(`Couldn't find room to delete with id: ${req.params.id}`);
    try {
        let guild = await client.guilds.fetch(process.env.GUILD_ID);
        await guild.channels.cache.get(room.discord_channel_id).delete();

    } catch (e) {
        res.status(404).send(`Couldn't delete the room with id: ${room.discord_channel_id} due to ${e}`);
    }
    await res.send(room);
});


module.exports = router;
