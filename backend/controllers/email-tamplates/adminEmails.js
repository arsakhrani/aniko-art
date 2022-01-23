module.exports.verifyArtist = (user, pic) => {
  return `Dear Admin, 
      ${user.fullName} is requesting verification.
      ${user}
      Would you like to verify this member? 
      Approve / Decline button. 
      ${pic}
      Warm Regards, 
      Your Aniko van Nie // Art Agency Team`;
};

module.exports.requestedArt = (user, request) => {
  return `Dear Admin, 
      ${user.fullName} (email: ${user.email}), is requesting the following artwork:
      ${request}
      Warm Regards, 
      Your Aniko van Nie // Art Agency Team`;
};

module.exports.verifyEmail = (user) => {
  return `Dear ${user.fullName},
    Please click here to verify your email.`;
};
