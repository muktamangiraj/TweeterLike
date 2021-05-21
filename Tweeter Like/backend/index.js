const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
const cors = require('cors');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/Database_Config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true });

app.use(cors());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Tweeterlike application."});
});


// Require Notes routes
require('./routes/User_Routes.js')(app);
require('./routes/Post_Routes.js')(app);

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});