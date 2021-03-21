// Loading express
const express = require('express');
const Joi = require('joi');
const mongoose = require("mongoose");
require("dotenv").config();

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();
client.login(process.env.BOT_SECRET);

client.on('ready', () => {
    console.log("Discord Client is listening!");
});


// Initialize the router
const router = express.Router();

// Creating a schema and model
const roomSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    desc: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 150
    },
    type: {
        type: String,
        enum: ["text", "voice"],
        required: true
    },
    scope: {
        type: String,
        enum: ["temporary", "permanent"],
        default: "temporary"
    },
    category: {
        type: String,
        enum: ["entertainment", "reading", "gaming", "random"],
        required: true
    },
    channel_link: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model("Room", roomSchema);


// Create a joi validation schema function
function validateRoom(room) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(50).required(),
        desc: Joi.string().min(10).max(150).required(),
        type: Joi.string().valid("text", "voice"),
        category: Joi.string().valid("entertainment", "reading", 'gaming', "random")
    });
    return schema.validate(room);
}

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
    var link;
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
        channel_link: `https://discord.gg/${link.code}`
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
    res.send(room);
});


module.exports = router;
