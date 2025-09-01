const express = require('express');
const Auction = require('../models/Auction');
const router = express.Router();

router.post('/', async (req, res) => {
  const { productTitle, productDescription, startingPrice, durationHours, sellerId } = req.body;
  const endTime = new Date(Date.now() + durationHours * 3600000);
  const auction = await Auction.create({
    sellerId, productTitle, productDescription,
    startingPrice, currentPrice: startingPrice,
    endTime
  });
  res.status(201).json(auction);
});

router.get('/', async (req, res) => {
  const auctions = await Auction.find({ status: 'active' }).sort({ endTime: 1 });
  res.json(auctions);
});

router.post('/:id/bid', async (req, res) => {
  const { amount, bidderId } = req.body;
  const auction = await Auction.findById(req.params.id);
  if (!auction || auction.status !== 'active') return res.status(400).send('Auction not active');
  if (amount <= auction.currentPrice) return res.status(400).send('Bid too low');
  auction.bids.push({ bidderId, amount });
  auction.currentPrice = amount;
  await auction.save();
  res.json(auction);
});

module.exports = router;