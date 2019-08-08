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
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

// should be last step
server.listen(4444, () => {
  console.log("Server is running on port 4444...");
});
