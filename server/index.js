const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

app.post('/message', (req, res) => {
    const { name, email, subject, message } = req.body;
    const data = { name, email, subject, message };

    fs.writeFileSync('messages.json', JSON.stringify(data, null, 2));
    res.status(200).send('Message received and stored');
});

app.get('/sendMessage', (req, res) => {
    const data = fs.readFileSync('messages.json', 'utf8');
    const options = {
        hostname: 'localhost',
        port: 4000,
        path: '/receiveMessage',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };

    const http = require('http');
    const request = http.request(options, (response) => {
        let responseData = '';
        response.on('data', (chunk) => {
            responseData += chunk;
        });
        response.on('end', () => {
            res.status(200).send(`Message sent to other server: ${responseData}`);
        });
    });

    request.on('error', (error) => {
        res.status(500).send(`Error sending message: ${error.message}`);
    });

    request.write(data);
    request.end();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
