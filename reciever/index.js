const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post('/receiveMessage', (req, res) => {
    console.log('Message received:', req.body);
    res.status(200).send('Message received');
});

app.listen(port, () => {
    console.log(`Receiver server running on port ${port}`);
});
