const Auction = require('../models/Auction');

setInterval(async () => {
  const now = new Date();
  const expired = await Auction.find({ endTime: { $lte: now }, status: 'active' });
  for (let auction of expired) {
    auction.status = 'ended';
    if (auction.bids.length > 0) {
      auction.winner = auction.bids[auction.bids.length - 1].bidderId;
    }
    await auction.save();
    console.log(`Auction ${auction._id} ended. Winner: ${auction.winner || 'No bids'}`);
  }
}, 60000);