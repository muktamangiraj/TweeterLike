module.exports = (app) => {
    const User = require('../controller/User_Controller.js');

    // Create a new Note
    app.post('/addUser', User.create);

    app.post("/login", User.login);

    app.get("/getAllUser", User.getAllUser);

    app.post("/getUserById", User.getUserById);

    app.post("/AddFollowing", User.AddFollowing);

    app.post("/AddFollower", User.AddFollower);

    app.post("/AddUnFollowing", User.AddUnFollowing);

    app.post("/AddUnFollower", User.AddUnFollower);

    app.post("/getPassword",User.getPassword);
    
}