const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());

//file upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './temp/'
}));

// Routes
app.use('/api', require('./route/route'));
app.get('/', (req, res) => {
    res.send('hello world')
});

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});