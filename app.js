const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
// const signupAPI = require("./APIs/signup");
const feedsAPI = require("./APIs/feeds")
const newChatAPI = require("./APIs/newChat")

mongoose.connect("mongodb://localhost:27017/WhatsappDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });


const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

// app.use("/signup", signupAPI);
app.use("/feeds", feedsAPI);
app.use("/newChat", newChatAPI);




app.listen(PORT, function (err) {
    if (!err) {
        console.log(`Wormhole active on port ${PORT}`)
    }
})
