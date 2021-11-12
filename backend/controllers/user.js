const User = require("../models/User");
const JWT = require("jsonwebtoken");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "FloatingHeads",
      sub: userID,
    },
    "FloatingHeads",
    { expiresIn: "1h" }
  );
};

module.exports.newUser = async (req, res) => {
  try {
    const { email, firstName, lastName, isAdmin } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      res
        .status(401)
        .json({ message: { msgBody: "Email is taken", msgError: true } });
    } else {
      const randomNumber = Math.floor(Math.random() * 1000);
      const numberToString = randomNumber.toString();
      const temporaryPassword = lastName.concat(numberToString);
      console.log(temporaryPassword);
      console.log(req.body);
      const newUser = new User({
        email,
        isAdmin,
        firstName,
        lastName,
        password: temporaryPassword,
      });
      newUser.save(() => {
        res
          .status(201)
          .json({ message: { msgBody: "Account created", msgError: false } });
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
      const { _id, email, firstName, lastName, isAdmin } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { firstName, email, lastName, isAdmin },
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
      user: { firstName: "", email: "", lastName: "", isAdmin: false },
      success: true,
    });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};

module.exports.getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send({ message: "user not found" });
  }
};

module.exports.editUser = async (req, res, next) => {
  try {
    const { id, email, username, name, location, lastName, gender, aboutMe } =
      req.body;
    const editedUser = {
      email,
      username,
      name,
      location,
      lastName,
      gender,
      aboutMe,
    };
    const userUpdate = await User.findByIdAndUpdate(id, editedUser);
    const sessionUser = helper.sessionizeUser(userUpdate);
    req.session.user = sessionUser;
    res.send(sessionUser);
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!" });
  }
};
