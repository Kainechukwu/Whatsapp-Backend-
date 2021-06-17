const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "User Id required"]
    },
    contact_id: {
        type: String,
        required: [true, "User Id required"]
    }
}
    , { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model("Contact", contactSchema);