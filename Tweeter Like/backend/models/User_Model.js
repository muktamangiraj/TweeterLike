const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Name : {
        type : String,
        required : "Required"
    },
    Email : {
        type: String,
        unique: true,
        trim: true
    },
    Password : {
        type : String,
        // required : "Required"
    },
    Following : {
        type : Array
    },
    Follower : {
        type : Array
    }
}, {
    timestamps: true
});

var user = mongoose.model("user", UserSchema);
module.exports = user;