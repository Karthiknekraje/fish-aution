const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  bidderId: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now }
});

const AuctionSchema = new mongoose.Schema({
  sellerId: String,
  productTitle: String,
  productDescription: String,
  startingPrice: Number,
  currentPrice: Number,
  endTime: Date,
  bids: [BidSchema],
  status: { type: String, enum: ['active', 'ended'], default: 'active' },
  winner: { type: String, default: null }
});

module.exports = mongoose.model('Auction', AuctionSchema);