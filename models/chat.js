const mongoose = require("mongoose")

const chatSchema = ({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String
    },
    created_at:{
        type:Date,
        required: true
    },
    updated_at:{
        type:Date,
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;