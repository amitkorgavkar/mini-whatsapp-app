const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// async error wrapper
function asyncWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
}

// connect to MongoDB
main()
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

// Home Route - show all chats
app.get("/chats", asyncWrap(async(req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
}));

// New Route - show create form
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Create Route - save new chat
app.post("/chats", asyncWrap(async(req, res, next) => {
    let { to, msg, from } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date(),
        updated_at: new Date(),
    });
    await newChat.save();
    res.redirect("/chats");
}));

// Show Route - view single chat detail
app.get("/chats/:id", asyncWrap(async(req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        return next(new ExpressError(404, "Chat not found"));
    }
    res.render("show.ejs", { chat });
}));

// Edit Route - show edit form
app.get("/chats/:id/edit", asyncWrap(async(req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        return next(new ExpressError(404, "Chat not found"));
    }
    res.render("edit.ejs", { chat });
}));

// Update Route - update message
app.put("/chats/:id", asyncWrap(async(req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg, updated_at: new Date() },
        { runValidators: true, new: true }
    );
    res.redirect("/chats");
}));

// Delete Route - remove a chat
app.delete("/chats/:id", asyncWrap(async(req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
}));

// Global error handler
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
