const Auction = require('../models/Auction');

module.exports = function(io) {
  io.on('connection', socket => {
    socket.on('join-auction', auctionId => {
      socket.join(auctionId);
    });

    socket.on('place-bid', async ({ auctionId, bidderId, amount }) => {
      const auction = await Auction.findById(auctionId);
      if (!auction || auction.status !== 'active') return;
      if (amount > auction.currentPrice) {
        auction.bids.push({ bidderId, amount });
        auction.currentPrice = amount;
        await auction.save();
        io.to(auctionId).emit('bid-updated', {
          auctionId,
          currentPrice: amount,
          bidderId
        });
      }
    });
  });
};