module.exports.verifyId = (user, approveLink, declineLink) => {
  return `<p>Dear Admin,</p>
  <br>
  <p>${user.fullName}, is requesting artist verification.
  Attached, please find images of their id and face.
  If you are happy with the request, 
  please click <a target="_blank" href=${approveLink}>here</a> to approve their request.</p>
  <p>Otherwise, to decline their request pleace click <a target="_blank" href=${declineLink}>here</a>.</p>
  <p>If no action is taken, request will be automatically declined in 24 hours.</p>
  <p>User's contact details: ${user.email}</p>
  <br>
  <img src=${user.idPicture} />
  <img src=${user.facePicture} />
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.requestedArt = (name, request, email) => {
  return `<p>Dear Admin,</p>
  <br>
  <p>${name}, is requesting the following artwork:</p>
  <p>Artist: ${request.artist}</p>
  <p>Country: ${request.country}</p>
  <p>Style: ${request.style}</p>
  <p>Size: ${request.size}</p>
  <p>Aesthetics: ${request.aesthetics}</p>
  <p>Material: ${request.material}</p>
  <p>Other: ${request.other}</p>
  <br>
  <p>User contact email: ${email}</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.informAdminOfSale = (buyer, seller, artwork, price) => {
  return `<p>Dear Admin,</p>
  <br>
  <p>An artwork has been sold.
  Please contact the buyer at, ${buyer.email}
  to confirm their shipping details.</p>
  <p>Please contact the seller at, ${seller.email}
  to advice them on the next steps.</p>
  <br>
  <p>THE ARTWORK SOLD IS:</p>
  <p>ID: ${artwork._id}</p>
  <p>Lot: ${artwork.lot}</p>
  <p>Title: ${artwork.title}</p>
  <p>Artist: ${artwork.artist}</p>
  <p>Purchase Price: ${price}</p>
  <br>
  <p>SHIPPING DETAILS TO BE CONFIRMED:</p>
  <p>Street: ${buyer.shippingAddress.street}</p>
  <p>City: ${buyer.shippingAddress.city}</p>
  <p>Country: ${buyer.shippingAddress.country}</p>
  <p>Post Code: ${buyer.shippingAddress.postCode}</p>
  <p>Special Instructions: ${buyer.shippingAddress.specialInstructions}</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.informAdminOfCanceledBid = (buyer, seller, artwork) => {
  return `<p>Dear Admin,</p>
  <br>
  <p>The bid by ${buyer.fullName} for ${artwork.title}
  was not accepted in time by ${seller.fullName}.
  You can contact them as follows.</p>
  <p>Buyer: ${buyer.email}</p>
  <p>Seller: ${seller.email}</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.informAdminOfSaleProcess = () => {
  return `<p>Dear Admin,</p>
  <br>
  <p>BLAA</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.chatRequest = (buyer, seller) => {
  return `<p>Dear Admin,</p>
  <br>
  <p>BLAA</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};
