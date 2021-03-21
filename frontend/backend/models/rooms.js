// Import Mongoose
const mongoose = require("mongoose");

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
    discord_channel_id: {
        type: String,
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

// Export joi validation model
const Joi = require('joi');

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


exports.roomSchema = roomSchema;
exports.validateRoom = validateRoom;