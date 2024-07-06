const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

// The base URL of the API you want to proxy
const apiBaseUrl = "https://en.seedfinder.eu/api/json";

app.use(express.json());

app.all("*", async (req, res) => {
  try {
    console.log("reqUrl: ", `${apiBaseUrl}${req.url}`);
    const response = await axios({
      method: req.method,
      url: `${apiBaseUrl}${req.url}`,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
