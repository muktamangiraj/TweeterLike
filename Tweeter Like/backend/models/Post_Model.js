const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    UserID : {
        type : String,
        required : "Required"
    },
    Name : {
        type : String,
        required : "Required"
    },
    About : {
        type: String,
    },
}, {
    timestamps: true
});

var post = mongoose.model("post", PostSchema);
module.exports = post;