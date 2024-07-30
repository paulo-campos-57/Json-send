const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 4000;

// Configurar middleware cors
app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.post('/receiveMessage', (req, res) => {
    const { name, email, subject, message } = req.body;
    const messageData = { name, email, subject, message };

    fs.writeFile('receivedMessage.json', JSON.stringify(messageData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
        }
        res.status(200).send('Message received');
    });
});

app.get('/getMessage', (req, res) => {
    fs.readFile('receivedMessage.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading message');
        }
        try {
            const messageData = JSON.parse(data);
            res.status(200).json(messageData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Error parsing message');
        }
    });
});

app.listen(port, () => {
    console.log(`Receiver server running on port ${port}`);
});
