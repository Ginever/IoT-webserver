const express = require("express");
const app = express();
const { getClient } = require("./get-client");

// This is our main function which handles serving HTTP requests

app.locals.client = null;

// Handling GET / request
app.use("/", async (req, res, next) => {
  const jsonResponse = (responseObject, responseCode = 200) => {
    res.writeHead(responseCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(responseObject));
  };
  const entries = await app.locals.client.query("SELECT * FROM waterdepth;");
  res.send(jsonResponse(entries.rows));
});

// Server setup
app.listen(3000, async () => {
  console.log("Server is Running");
  app.locals.client = await getClient();
});
