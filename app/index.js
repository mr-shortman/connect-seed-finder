const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send(
    '<meta name="seedfinderverification" content="Open Sesame!" /> <p>Hi there, lets go!</p>'
  );
});

app.get("/pseudo-search", async function (req, res) {
  const response = await fetch(
    "https://en.seedfinder.eu/api/json/search.json?q=Super%20Skunk"
  );
  const result = await response.json();
  res.json(result);
});

app.listen(3000);
