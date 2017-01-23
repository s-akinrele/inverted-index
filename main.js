const express = require('express');
const app = express();
const path = require('path');

app.use(express.static((__dirname)));

let server = app.listen(process.env.PORT || 5000, function() {
    console.log('Server listening on port 3000');
});