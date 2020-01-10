'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const router = express.Router();
router.get('/', (req, res) => {
  var pusher = new Pusher({
    appId: '930069',
    key: 'f1862ffb211f8bb5d61a',
    secret: '08fedd2326ee8a716cb9',
    cluster: 'ap1',
    encrypted: true
  });

  pusher.trigger('my-channel', 'my-event', {
    "message": "hello world"
  });
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
