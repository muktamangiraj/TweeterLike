module.exports = (app) => {
    const Post = require('../controller/Post_Controller.js');
    
    app.get("/test", Post.test);
    app.post("/addpost", Post.addPosts);
    app.post("/getAllPostsById", Post.getAllPostsById);
    app.get("/getAllPosts",  Post.getAllPosts);
    app.post("/deletePost",  Post.deletePost);
    
}