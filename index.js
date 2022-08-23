const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

//let vapidKeys = webpush.generateVAPIDKeys();
//console.log(vapidKeys)

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());
app.use(cors());

//Hier erstellte VAPID Keys einfügen
const publicVapidKey ="";
const privateVapidKey = ""

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Backend Route auf z.B. localhost:5000
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - Subscription created - eventuelle DB Speicherung
  res.status(201).json({});

  // Inhalt erstellen
  const payload = JSON.stringify({ 
    title: "Server Test",
    body: "Notified by Server!",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Progressive_Web_Apps_Logo.svg/220px-Progressive_Web_Apps_Logo.svg.png" 
  });

  // Webpush auslösen 
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
