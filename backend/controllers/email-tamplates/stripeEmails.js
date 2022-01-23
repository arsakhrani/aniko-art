module.exports.purchaseComplete = (user, artwork) => {
  return `Dear ${user.fullName}, 
    Congratulations on collecting your new artwork! 
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
    Aniko van Nie // Art Agency Team`;
};

module.exports.bidPlaced = (user, artwork) => {
  return `Dear ${user.fullName}, 
    Thank you for placing your bid of ${artwork.minimumBid} on ${artwork.title} by ${artwork.artist}. 
    If the (artist/gallery/privateseller) does not respond within 72 hours after being notified of the offer, 
    the offer will be canceled. Should this happen, 
    a representative from our Team will notify you with the news and will offer you 
    their Art Advisory services free of charge to help you find a similar artwork.
    Possibly your artwork will be overbidden.

    Warm Regards,
    Aniko van Nie // Art Agency Team
    `;
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
