const root = document.getElementById('root');

async function fetchAuctions() {
  const res = await fetch('http://localhost:3000/api/auctions');
  const auctions = await res.json();

  root.innerHTML = '<h1>Active Auctions</h1>';
  auctions.forEach(auction => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${auction.productTitle}</h3>
      <p>${auction.productDescription}</p>
      <p>Current Price: ₹${auction.currentPrice}</p>
      <p>Ends: ${new Date(auction.endTime).toLocaleString()}</p>
    `;
    root.appendChild(div);
  });
}

fetchAuctions();