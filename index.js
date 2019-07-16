const express = require('express');
var fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Creating a path (action, endpoint)
app.get('/api/users', (req,res) => {
    // By requesting this path, the API will send this response.
    // Send a JSON array of all the users.
    // res.send('<h1>Hi World!</h1>');
    fs.readFile("./data/users.json", function(err, data) {
        if (err) throw err;
        var users = JSON.parse(data);
        res.json(users);
    });
});
 
// HOMEWORK
// Creating a path (action, endpoint)
app.get('/api/properties', (req,res) => {
    // By requesting this path, the API will send this response.
    // Send a JSON array of all the properties.
    res.send('<h1>Hi World!</h1>');
});

// HOMEWORK
// Make sure to add userId to your properties!
app.get('/api/properties/:userId', (req,res) => {
    // By requesting this path, the API will send this response.
    // Send a JSON array of all the properties belonging to the user with the given userId.
        // Get all hte properties (make sure userId is stored on the property)
        // Filter the properties to only look at those that have the userId given. 
    res.send('<h1>Hi World!</h1>');
});

// HOMEWORK
// 1. Get users - done in line 49
// 2. Check if email is duplicated
// 3. If not, add new user to users
// 4. Rewrite to file
app.post('/api/register', (req,res) => {
    // By requesting this path, the API will send this response.
    // Create another entry in the users JSON array. 
    // Response depends on the API designer. 
      // Usually: send back the user that was created.
    fs.readFile("./data/users.json", function(err, data) {
        if (err) throw err;
        var users = JSON.parse(data);
        // HOMEWORK: Check if postData email is duplicated in users array.
            // If it is, send an error
            // res.status(...).send(...)
        // HOMEWORK: If not, add a new user to the users array.
        // Write the users JSON into the file.
        fs.writeFile("./data/users.json", JSON.stringify(users), function(err) {
            if (err) throw err;
            // Send the correct response
            // res.send...
        });
    });
});

app.post('/api/authenticate', (req, res) => {
    const userPostData = req.body;
    // (not yet) Update the user to have a logged in status. 
    // (right now) Check whether authentication is correct and send back authenticated user
    fs.readFile("./data/users.json", function(err, data) {
        if (err) throw err;
        var users = JSON.parse(data);
        var foundUser = users.filter(function(user) {
            return user.email == userPostData.email && user.password == userPostData.password;
        })[0];
        // If I found a user, send the user back
        // If not, send an error
        if (foundUser) {
            res.send(foundUser)
        } else {
            // HTTP Response codes
            // 200 = OK (no error, you're all good!)
            // 300 = Redirect (you're being taken somewhere else)
            // 400 = User error (you made a mistake)
            // 500 = Server error (we made a mistake)
            res.status(400).send({error: "Email or password incorrect"})
        }
    });
});
 

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));