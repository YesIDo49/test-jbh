const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/srt', (req, res) => {
    const srtPath = path.join(__dirname, 'test', 'test.srt');
    fs.readFile(srtPath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading SRT file');
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
