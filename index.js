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
  const entries = await app.locals.client.query(
    "SELECT * FROM waterdepth ORDER BY dt DESC LIMIT 1;",
    function (err, result, fields) {
      if (err) {
        console.error(err);
        return;
      }
      res.send(jsonResponse(result));
    }
  );
});

// Server setup
app.listen(3000, async () => {
  console.log("Server is Running");
  app.locals.client = await getClient();
  app.locals.client.query("use lora");
});
