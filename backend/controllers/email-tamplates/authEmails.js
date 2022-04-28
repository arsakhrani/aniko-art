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

module.exports.verifyIdApproved = (name) => {
  return `<p>Dear ${name},</p>
    <br>
    <p>Congratulations! Your verification request has been approved.</p>
    <br>
    <p>Warm Regards,</p>
    <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.verifyIdDeclined = (name) => {
  return `<p>Dear ${name},</p>
    <br>
    <p>Your verification request has been declined and account deleted.</p>
    <br>
    <p>Warm Regards,</p>
    <p>Your Aniko van Nie // Art Agency Team</p>`;
};

module.exports.transferAccount = (link) => {
  return `<p>Dear Sir/Madam,</p>
    <br>
    <p>You are recieving this because Aniko.Art has invited you to take over an account.
    If you accept, please click <a target="_blank" href=${link}>here</a> to set up your account.</p>
    <br>
    <p>Warm Regards,</p>
    <p>Your Aniko van Nie // Art Agency Team</p>`;
};
