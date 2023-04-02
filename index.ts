// ep 25

import http from 'http';
import dotenv from 'dotenv';
import app from './app/app';

dotenv.config();

const PORT = process.env.PORT || 3000;


const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})