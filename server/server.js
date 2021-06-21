require('dotenv').config();

const express = require('express');
const routers = require('./src/routers');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000" //client url
    }
});

require('./src/socket')(io);

const port = 5000;

app.use(express.json());
app.use(cors())
app.use('/api/v1', routers);


server.listen(port, () => console.log(`Running on port ${port}`));