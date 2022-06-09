const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fs = require("fs");
const cors = require('cors')

const authRoutes = require('./api/routes/AuthRoutes');


dotenv.config();
const PORT = process.env.PORT;
const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors())

//logger config
server.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));



server.use('/api/auth', authRoutes);


mongoose.connect(process.env.DB_CONNECTION_URL)
    .then((result) => {
        console.log('connected to DB');
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch((error) => {
    console.log(error);
})