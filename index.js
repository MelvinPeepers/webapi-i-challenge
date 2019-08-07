// implement your API here

// libraries
const express = require("express");

// global objects
const server = express();

// request handler
server.get("/", (req, res) => {
  res.send("<h1>Challenge</h1>");
});

// should be last step
server.listen(4444, () => {
  console.log("Server is running on port 4444...");
});
