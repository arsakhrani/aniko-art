const devEmail = process.env.DEV_EMAIL;

module.exports.informBuyerOfSale = (user, artwork, price) => {
  return `<p>Dear ${user.fullName},</p>
  <br>
  <p>Congratulations on collecting your new artwork! 
  Below you can find all the details of your artwork shipment. 
  It is worth noting that we are careful in packing and processing your artwork. 
  Therefore we are using the safest shipping services with DHL, 
  Fedex or one of our partners at ICEFAT Art Logistics for artworks above €10,000,-. 
  Once the shipment has been packed and collected by the shipping firm, you'll be sent tracking information.
  If the shipping details below are incorrect or missing,
  please send an email to us at ${devEmail} to confirm your details. 
  Once the artwork has been delivered to you, we ask that you verify the artwork has been received in good condition. 
  If the work arrives damaged please contact our support team within 24 hours of taking delivery of the work.
  All resale transactions are final sale. 
  You will not be able to return your purchase once received from the owner of the work.</p>
  <br>
  <p>YOUR ARTWORK IS:</p>
  <p>Lot: ${artwork.lot}</p>
  <p>Title: ${artwork.title}</p>
  <p>Artist: ${artwork.artist}</p>
  <p>Purchase Price: ${price}</p>
  <br>
  <p>AND WE'LL DELIVER TO:</p>
  <p>Street: ${user.shippingAddress.street}</p>
  <p>City: ${user.shippingAddress.city}</p>
  <p>Country: ${user.shippingAddress.country}</p>
  <p>Post Code: ${user.shippingAddress.postCode}</p>
  <p>Special Instructions: ${user.shippingAddress.specialInstructions}</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.informSellerOfSale = (name, artwork, price) => {
  return `<p>Dear ${name},</p>
  <br>
  <p>Congratulations on selling your artwork! 
  Below you can find all the details of your sold artwork. 
  You will be contacted within 72 hours by a member of the Aniko Art Agency Team on how to proceed with the shipment process.
  Our team member will also inform you on how to collect your sale value.</p>
  <br>
  <p>YOUR SOLD ARTWORK IS:</p>
  <p>Lot: ${artwork.lot}</p>
  <p>Title: ${artwork.title}</p>
  <p>Artist: ${artwork.artist}</p>
  <p>Purchase Price: ${price}</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.setNewBidBuyer = (name, bid, artwork) => {
  return `<p>Dear ${name},</p>
  <br>
  <p>Thank you for placing your bid of ${bid} on ${artwork.title} by ${artwork.artist}.
  If the (artist/gallery/privateseller) does not respond within 72 hours after being notified of the offer, 
  the offer will be canceled. Should this happen, 
  a representative from our Team will notify you with the news and will offer you 
  their Art Advisory services free of charge to help you find a similar artwork.
  Possibly your artwork will be overbidden.</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.setNewBidSeller = (name, bid, artwork) => {
  return `<p>Dear ${name},</p>
  <br>
  <p>This is to inform you that a user has placed a bid of ${bid} on ${artwork.title} by ${artwork.artist}.
  If you do not respond within 72 hours after being notified of the offer, 
  the offer will be canceled. Should you choose to accept this bid, 
  you can do so by visiting the artwork on Aniko.Art and clicking "Accept Bid".
  There is a possibiltly your artwork will be overbidden.</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.informOldBidHolder = (name, bid, artwork) => {
  return `<p>Dear ${name},</p>
  <br>
  <p>This is to inform you that another user has placed a bid of ${bid} on ${artwork.title} by ${artwork.artist}.
  This offer has beaten yours. You can still try to place a bid to beat the current bid of ${bid}.
  To do so, please visit the artwork on Aniko.Art and click on "Bid"</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.bidWon = (user, artwork) => {
  return `Dear ${user.fullName}, 
    Congratulations! Your bid was successful.
    Below you can find the invoice and all the details of your artwork shipment. 
    It is worth noting that we are careful in packing and processing your artwork. 
    Therefore we are using the safest shipping services with DHL, 
    Fedex or one of our partners at ICEFAT Art Logistics for artworks above €10,000,-. 
    Once the shipment has been packed and collected by the shipping firm, you'll be sent tracking information.
    You can adjust your shipping details up to 1 hour after receiving this email. 
    Just log into your account where you can view the last order placed. 
    This will give you the option to adjust information in the specified timeframe.
    Once the artwork has been delivered to you, we ask that you verify the artwork has been received in good condition. 
    If the work arrives damaged please contact our support team within 24 hours of taking delivery of the work.
    All resale transactions are final sale.
    You will not be able to return your purchase once received from the owner of the work.

    YOUR ARTWORK NUMBER IS:
    ${artwork.lot}
    AND WE'LL DELIVER TO:
    ${user.shippingAddress}

    YOU ORDERED:
    ${artwork}
    
    Warm Regards,
    Aniko van Nie // Art Agency Team 
    `;
};
