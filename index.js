// implement your API here

// libraries
const express = require("express");

// other files
const db = require("./data/db.js");

// global objects
const server = express();

// middleware
server.use(express.json());

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
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});
// Tested the above with POSTMAN and it works

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
// tested the above POST in POSTMAN

// DELETE user
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleteUser => {
      if (deleteUser) {
        res.json(deleteUser);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The user could not be removed"
      });
    });
});
// tested the above POST in POSTMAN

// PUT user
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { name, bio } = req.body;

  db.update(id, changes)
    .then(updated => {
      if (!updated) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else if (!name || !bio) {
        res.status(400).json({
          errorMessage: "Please provide name and bio for the user."
        });
      } else {
        res.json(updated);
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The user information could not be modified."
      });
    });
});
// tested with Postman seems to be working correctly

// should be last step
server.listen(4444, () => {
  console.log("Server is running on port 4444...");
});
