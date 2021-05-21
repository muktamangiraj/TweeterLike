const User = require('../models/User_Model.js');

// Create and Save a new Note
exports.create = (req, res) => { 
    if (
        req.body.Name
        && req.body.Email
        && req.body.Password
    ) {
        User.findOne({ Email: req.body.Email }, function (err, Data) {
            if (err) {
                res.json({ status: "ERROR", message: "Getting some issue." });
            } else {
                if (Data) {
                    res.json({ status: "ERROR", message: "User already exists." });
                } else {
                    var userDetails = new User({
                        Name: req.body.Name,
                        Email: req.body.Email,
                        Password: req.body.Password
                    });
                    userDetails.save(function (saveErr, saveResult) {
                        if (saveErr || !saveResult) {
                            res.json({ status: "ERROR", message: "Getting issue." });
                        } else {
                            res.json({
                            status: "OK",
                            message: "User saved successfully",
                            data: saveResult
                        });
                        }
                    });
                }
            }
        });
    } else {
        res.json({ status: "ERROR", msg: "Please Enter all valid details." });
    }

};



// Login
exports.login = (req , res) =>{
    
    if (req.body.Email && req.body.Password) {
        User.findOne({ Email: req.body.Email }, function (err, Data) {
            
            if (err || !Data) {
                res.json({ status: "ERROR", msg: "Email not found" });
            } else {
                console.log();
                var userPasswd = Data.Password;
                var passwd = req.body.Password.trim();
                if (userPasswd === passwd) {
                        res.json({
                            status: "OK",
                            msg: "You are successfully logged in.",
                            data: Data
                        });
                    } else {
                        res.json({ status: "ERROR", msg: "Wrong Password." });
                    }
               
            }
        });
    } else {
        res.json({ status: "ERROR", msg: "Pelase enter all valid details." });
    }

}

// Forgot Password
exports.getPassword = (req , res) =>{
    
    if (req.body.Email) {
        User.findOne({ Email: req.body.Email }, function (err, Data) {
            if (err || !Data) {
                res.json({ status: "ERROR", msg: "User not found." });
            } else {
                res.json({
                    status: "ok",
                    msg: "User details get successfully",
                    data: Data.Password
                });
            }
        });
    } else {
        res.json({ status: "ERROR", msg: "Please enter Email." });
    }
}

// Find all relations
exports.getAllUser = (req, res) => {
        User.find()
    .then(allUser => {
        console.log("all data is called");
        console.log(allUser);
        res.send(allUser);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

   
};

// Get user by id
exports.getUserById = (req , res) =>{
    
    if (req.body._id) {
        User.findOne({ _id: req.body._id }, function (err, Data) {
            if (err || !Data) {
                res.json({ status: "ERROR", msg: "User not found." });
            } else {
                res.json({
                    status: "ok",
                    msg: "User details get successfully",
                    data: Data
                });
            }
        });
    } else {
        res.json({ status: "ERROR", msg: "Please enter User id." });
    }
}

// Add following

exports.AddFollowing = (req, res) => {
    if (req.body._id && req.body.UserID) {

        User.findOne({ _id: req.body._id }, function (err, Data) {
            if (err || !Data) {
                res.json({ status: "ERROR", msg: "User not found." });
            } else {
                
                if(Data.Following.indexOf(req.body.UserID) !== -1){
                    res.json({ status: "ERROR", msg: "Already Following." });
                } 
                else if(req.body._id === req.body.UserID)
                {
                    res.json({ status: "ERROR", msg: "Sorry you cannot follow yourself!" });
                }
                else{
                    User.findOneAndUpdate({ _id: req.body._id }, { $push: { Following : req.body.UserID} } , { new: true },
                    function (updateErr, updateData) {
                        if (updateErr || !updateData) {
                            res.json({ status: "ERROR", msg: "Getting some issue." });
                        } else {
                            res.json({
                                status: "OK",
                                msg: "Following added successfully.",
                                data: updateData
                            });
                        }
                    }
                    );
                }
            }
        });

    } else {
        res.json({ status: "ERROR", msg: "Please Enter all valid details." });
    }

};

// Add follower

exports.AddFollower = (req, res) => {
    if (req.body._id && req.body.UserID) {

        User.findOne({ _id: req.body.UserID }, function (err, Data) {
            if (err || !Data) {
                res.json({ status: "ERROR", msg: "User not found." });
            } else {
                
                if(Data.Following.indexOf(req.body.UserID) !== -1){
                    res.json({ status: "ERROR", msg: "Already Following." });
                } 
                else if(req.body._id === req.body.UserID)
                {
                    res.json({ status: "ERROR", msg: "Sorry you cannot follow yourself!" });
                }
                else{
                    User.findOneAndUpdate({ _id: req.body.UserID }, { $push: { Follower : req.body._id } }, { new: true },
                    function (updateErr, updateData) {
                        if (updateErr || !updateData) {
                            res.json({ status: "ERROR", msg: "Getting some issue." });
                        } else {
                            res.json({
                                status: "OK",
                                msg: "Follower added successfully.",
                                data: updateData
                            });
                        }
                    }
                    );
                    
                }
            }
        });

    } else {
        res.json({ status: "ERROR", msg: "Please Enter all valid details." });
    }

};

// Unfollow
exports.AddUnFollowing = (req, res) => {
    if (req.body._id && req.body.UserID) {

        User.findOne({ _id: req.body._id }, function (err, Data) {
            if (err || !Data) {
                res.json({ status: "ERROR", msg: "User not found." });
            } else {
                
                console.log(Data.Following.indexOf(req.body.UserID));
                if(Data.Following.indexOf(req.body.UserID) === -1){
                    res.json({ status: "ERROR", msg: "Already not Following." });
                } 
                else if(req.body._id === req.body.UserID)
                {
                    res.json({ status: "ERROR", msg: "Sorry you cannot unfollow yourself!" });
                }
                else{
                    User.findOneAndUpdate({ _id: req.body._id }, { $pull : { Following : req.body.UserID }},{useFindAndModify: false},
                    function (updateErr, updateData) {
                        if (updateErr || !updateData) {
                            console.log(updateErr);
                            res.json({ status: "ERROR", msg: "Getting some issue." });
                        } else {
                            res.json({
                                status: "OK",
                                msg: "unFollowed successfully.",
                                // data: updateData
                            });
                        }
                    }
                    );
                }
                }
            
        });

    } else {
        res.json({ status: "ERROR", msg: "Please Enter all valid details." });
    }

};

// Unfollower

exports.AddUnFollower = (req, res) => {
    if (req.body._id && req.body.UserID) {

        User.findOne({ _id: req.body.UserID }, function (err, Data) {
            if (err || !Data) {
                res.json({ status: "ERROR", msg: "User not found." });
            } else {
                
                if(Data.Follower.indexOf(req.body._id) === -1){
                    res.json({ status: "ERROR", msg: "Already not Following." });
                } 
                else if(req.body._id === req.body.UserID)
                {
                    res.json({ status: "ERROR", msg: "Sorry you cannot follow yourself!" });
                }
                else{
                    User.findOneAndUpdate({ _id: req.body.UserID }, { $pull: { Follower : req.body._id } }, { new: true },
                    function (updateErr, updateData) {
                        if (updateErr || !updateData) {
                            res.json({ status: "ERROR", msg: "Getting some issue." });
                        } else {
                            res.json({
                                status: "OK",
                                msg: "unfollower successfully.",
                                data: updateData
                            });
                        }
                    }
                    );
                    
                }
            }
        });

    } else {
        res.json({ status: "ERROR", msg: "Please Enter all valid details." });
    }

};