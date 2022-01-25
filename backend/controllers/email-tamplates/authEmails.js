module.exports.forgotPassword = (name, link) => {
  return `<p>Dear ${name},</p>
  <br>
  <p>You are recieving this because you (or someone else) has requested a password reset.
  If you have not done so, please ignore this email. If you have requested a password reset, 
  please click <a target="_blank" href=${link}>here</a> to enter new password.</p>
  <br>
  <p>Warm Regards,</p>
  <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.verifyEmail = (name, link) => {
  return `<p>Dear ${name},</p>
    <br>
    <p>Welcome to Aniko.Art! In order to verify your email,
    please click <a target="_blank" href=${link}>here</a>.</p>
    <br>
    <p>Warm Regards,</p>
    <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.verifyArtistApproved = (name) => {
  return `<p>Dear ${name},</p>
    <br>
    <p>Congratulations! Your verification request has been approved.</p>
    <br>
    <p>Warm Regards,</p>
    <p>Your Aniko van Nie // Art Agency Team</p>`;
};
