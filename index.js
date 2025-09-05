const express = require("express");
const app = express();

// sample route
app.get("/", (req, res) => {
  res.send("Bookiya");
});

// export for vercel
module.exports = app;
