const express = require('express');
const fs = require('fs');
const cors = require('cors');
const WebSocket = require('ws');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
        console.log('received:', message);
    });

    ws.send(JSON.stringify({ message: 'WebSocket connection established' }));
});

app.post('/message', (req, res) => {
    const { name, email, subject, message } = req.body;
    const messageData = { name, email, subject, message };

    fs.writeFile('receivedMessage.json', JSON.stringify(messageData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
        }

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messageData));
            }
        });

        res.status(200).send('Message received');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
