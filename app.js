const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.set('strictQuery',false);
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/dinooDB", { useNewUrlParser: true });

// Create a Mongoose schema for the player
const playersSchema = new mongoose.Schema({
    name: String,
    email: String,
    question1: String,
    question2: String,
    question3: String
});

// Create a Mongoose model based on the schema
const Player = mongoose.model('Player', playersSchema);

// Handle form submission
app.post('/index', (req, res) => {
    // Create a new player object
    const player = new Player({
        name: req.body.name,
        email: req.body.email,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3
    });
    // Save the player to the database
    player.save((err, player) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Successfully saved player: ${player} to DB.`);
        }
    });
    res.render("list",{listPlayer:"Today",newlistPlayer});
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
