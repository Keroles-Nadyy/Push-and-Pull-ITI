const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

app.get('/', (req, res) => {
    const filePath = './mycv.txt';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading file' });
            return;
        }
        res.json({ data: data });
    });
});

app.get('/poll', (req, res) => {
    const clientTime = parseInt(req.query.lastmod, 10);
    console.log(clientTime);
    const filePath = './mycv.txt';

    const checkFileModification = () => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.status(500).json({ error: 'File not found or inaccessible' });
                return;
            }
            const fileTime = stats.mtime.getTime();

            if (clientTime < fileTime) {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        res.status(500).json({ error: 'Error reading file' });
                        return;
                    }
                    res.json({
                        data: data,
                        filetime: fileTime
                    });
                });
            } else {
                console.log("Checking for modification....");
                setTimeout(checkFileModification, 5000);
            }
        });
    };

    checkFileModification();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
