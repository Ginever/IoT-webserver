const express = require("express");
const app = express();
const db= require("./get-client");

// This is our main function which handles serving HTTP requests
const { SerialPort } = require('serialport');

const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 });
// Read the port data
port.on("open", () => {
  console.log('serial port open');
});

port.on("data", (d) => {
  const [data , rssi] = d.toString().split("::").map((s,i) => i === 0 ? s.split(":") : s);
  console.log('Data received: ' + data);
  console.log('RSSI: ' + rssi);


  db.query(
    "INSERT INTO waterdepth (sensor1, sensor2, sensor3) VALUES (?, ?, ?);", [data[0], data[1], data[2]],
    function (err, result) {
      if (err) {
        console.error(err);
      }
      console.log("Data inserted successfully");
    }
  );
});

app.use(express.static('public'));

app.set("view engine", "ejs");

// Handling GET / request
app.use("/", async (req, res, next) => {
  const jsonResponse = (responseObject, responseCode = 200) => {
    res.writeHead(responseCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(responseObject));
  };
  db.query(
    "SELECT * FROM waterdepth ORDER BY time DESC LIMIT 1;",
    function (err, result, fields) {
      if (err) {
        console.error(err);
        return;
      }

      const depth = [result[0].sensor1, result[0].sensor2, result[0].sensor3];
      res.render("index", { depth }); //end the response
    }
  );
});

// Server setup
app.listen(process.env.PORT || 3000, async () => {
  console.log("Server is Running on port", process.env.PORT || 3000);
});
