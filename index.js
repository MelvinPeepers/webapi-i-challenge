// implement your API here

// libraries
const express = require("express");

// other files
const db = require("./data/db.js");

// global objects
const server = express();

// What happens on a GET request to /
// request handler
// req (request) is what is coming to us, res (response) is what we're sending out
server.get("/", (req, res) => {
  res.send("<h3> Web API Challenge</h3>");
});

// GET users
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      // console.log("users", users);
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});
// tested the above GET and it works

// GET user ID

// POST user
server.post("/api/users", (req, res) => {
  const newUser = req.body;

  db.insert(newUser)
    .then(user => {
      if (newUser.name && newUser.bio) {
        res.status(201).json(user);
      } else {
        res.status(400).json({
          errorMessage: "Please provide name and bio for the user."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

// DELETE user

// PUT user

// should be last step
server.listen(4444, () => {
  console.log("Server is running on port 4444...");
});
