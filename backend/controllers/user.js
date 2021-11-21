const User = require("../models/User");
const JWT = require("jsonwebtoken");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "FloatingHeads",
      sub: userID,
    },
    "FloatingHeads",
    { expiresIn: "14d" }
  );
};

module.exports.newUser = async (req, res) => {
  try {
    const user = req.body;
    const emailCheck = await User.findOne({ email: user.email });
    if (emailCheck) {
      res
        .status(401)
        .json({ message: { msgBody: "Email is taken", msgError: true } });
    } else {
      const newUser = new User(user);
      await newUser.save(() => {
        const token = signToken(newUser._id);
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.status(201).json({ user: newUser, isAuthenticated: true });
      });
    }
  } catch (e) {
    res.status(400).json({
      message: { msgBody: "An error has occured", msgError: true },
    });
  }
};

module.exports.logInUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = req.user;
      console.log(user);
      const token = signToken(user._id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user,
      });
    }
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

module.exports.logOutUser = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.json({
      user: {},
      success: true,
    });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

module.exports.authenticated = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ isAuthenticated: true, user });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

module.exports.editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    await User.findByIdAndUpdate(id, user);
    const updatedUser = await User.findById(id);
    res.status(201).json({ user: updatedUser, isAuthenticated: true });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

module.exports.requestArtWork = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = req.body;
    const user = await User.findById(id, user);
    user.requestedArtWork.push(request);
    await user.save(); //should send email with nodemailer here
    res.status(201).json({ success: true });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

// module.exports.getUserInfo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) {
//       res.send("user not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send({ message: "user not found" });
//   }
// };
