const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: String,
        required: [true, "Specify sender Id"]
    },
    receiver_id: {
        type: String,
        required: [true, "Specify receiver Id"]
    },
    message: {
        type: String,
        required: [true, "No empty messages"]
    },
    messageImage: String

},
    { timestamps: { createdAt: 'created_at' } }// audit fields
);

module.exports = mongoose.model("Message", messageSchema);