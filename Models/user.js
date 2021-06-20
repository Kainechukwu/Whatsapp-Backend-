const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // firstName: {
    //     type: String,
    //     required: [true, "Please specify first name"],
    //     trim: true
    // },
    // lastName: {
    //     type: String,
    //     required: [true, "Please specify last name"],
    //     trim: true
    // },
    username: {
        type: String,
        // required: [true, "Please specify username"],
        trim: true
    },
    contactNumber: {
        type: String,
        required: [true, "Please specify contact number"],
        unique: true,// mongoose unique constraints
        trim: true
    },
    
     userType: String//basic or Admin user
    ,

    profileImage: String,
    userTokens: [String]

}
    , { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model("User", userSchema);