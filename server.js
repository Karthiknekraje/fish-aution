require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const auctionRoutes = require('./routes/auctions');
const initBidSocket = require('./sockets/bidSocket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use('/api/auctions', auctionRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

initBidSocket(io);

// Auction cleanup task
require('./sockets/auctionCleanup');

server.listen(3000, () => console.log('Server running on http://localhost:3000'));