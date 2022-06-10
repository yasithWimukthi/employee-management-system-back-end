import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import cors from "cors"
import morgan from "morgan";

import authRoutes from "./routes/AuthRoutes.js";
import employeeRoutes from "./routes/EmployeeRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";

dotenv.config();
const PORT = process.env.PORT;
const server = express();
server.use(bodyParser.json());
server.use(express.urlencoded({extended: false}));
server.use(cors())

//logger config
server.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));

server.use('/api/auth', authRoutes);
server.use('/api/employee', employeeRoutes);
server.use('/api/admin', adminRoutes);

mongoose.connect(process.env.DB_CONNECTION_URL)
    .then((result) => {
        console.log('connected to DB');
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch((error) => {
    console.log(error);
})