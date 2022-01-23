module.exports.forgotPasswort = (user, tempPassword) => {
  return `Dear ${user},
    Your password has been reset.
    Your new password is: ${tempPassword}
    Please change this password after login in Manage Profile. 
    Warm Regards,
    Your Aniko van Nie // Art Agency Team`;
};
