const Post = require('../models/Post_Model.js');

// Add posts
exports.addPosts = (req , res) =>{
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwww");
    console.log(req);
    if (req.body.UserID
        && req.body.Name
        && req.body.About) {
        var head_Details = new Post({
            UserID: req.body.UserID,
            Name: req.body.Name,
            About: req.body.About
        });

        head_Details.save(function (saveErr, saveResult) {
            if (saveErr || !saveResult) {
                res.json({ status: "ERROR", msg: "Getting issue." });
            } else {
                res.json({
                    status: "OK",
                    message: "Post Added successfully",
                    data: saveResult
                });
            }
        });

    } else {
        res.json({ status: "ERROR", msg: "Please Enter all valid details." });
    }

}

exports.test = (req , res, next) =>{
    console.log("xxxxxxxxxxxxxxx111111");
    res.json({ status: "ok", msg: "Working.." });
}

// Get All posts by id
exports.getAllPostsById = (req , res) =>{
    console.log("aaaaaaaaaaaaaaaaaaaaa");
    if (req.body.UserID) {
        Post.find({ UserID: req.body.UserID }, function (err, Data) {
            if (err || !Data) {
                res.json({ status: "ERROR", msg: "Posts not found." });
            } else {
                res.json({
                    status: "ok",
                    msg: "Posts details get successfully",
                    data: Data
                });
            }
        });
    } else {
        res.json({ status: "ERROR", msg: "Please enter User id." });
    }
}

// Get All Posts
exports.getAllPosts = (req, res) => {
        Post.find().sort({createdAt:-1})
    .then(allPost => {
        console.log("all data is called");
        console.log(allPost);
        res.send(allPost);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

   
};

// delete post
exports.deletePost = (req , res) =>{
    if (req.body._id) {
        Post.remove({ _id: req.body._id }, function (RErr, RData) {
            // if (RErr || !RData) {
            //     res.json({ status: "ERROR", msg: "Post not found." });
            // } else {
                res.json({
                    status: "OK",
                    msg: "Post removed successfully."
                });
            // }
        });
    } else {
        res.json({ status: "ERROR", msg: "Please enter Post id." });
    }
}