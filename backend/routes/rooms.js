// Loading express
const express = require('express');
const Joi = require('joi');
const mongoose = require("mongoose");

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
    category: {
        type: String,
        enum: ["entertainment", "reading", "gaming", "random"]
    },
    channelLink: {
        type: String,
        required: true
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
        .sort({ name: 1 });
    res.send(rooms);
});

// Create a room 
router.post('/', async (req, res) => {
    const { error } = validateRoom(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create a discord room

    // Add the room to the database
    let room = new Room(req.body);
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
