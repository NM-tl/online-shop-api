const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../filesUpload.log');

const logEvent = (message) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
};

module.exports = logEvent;
