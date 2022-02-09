import mongoose from 'mongoose'
import { createServer } from 'http';
import app from './app';
import {MONOG_URI} from "./utils/constants.util";
import {APIError} from "./errors/api.error";
import { Server } from 'socket.io';

const server = createServer(app);

mongoose.connect(MONOG_URI).then(() => {
    server.listen(3000, () => {
        console.log('Now Listening on port 3000')
    });
}).catch(err => {
    console.log('There was an error while connecting to the database');
    console.log(APIError.fromError(err))
});
