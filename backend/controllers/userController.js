const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const createUser = async (req, res, next) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist === null) {
      let hash = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hash,
      });
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Please check the inputs!" });
      }

      const result = await newUser.save();
      res.json({ user: result });
    } else {
      res.status(409).json({ message: "User already exists!" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const loginDetails = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await User.findOne({ email: loginDetails.email });
    if (user === null) {
      return res.status(401).json({ message: "Email or password are incorrect!" });
    }

    let isPasswordCorrect = await bcrypt.compare(loginDetails.password, user.password);

    if (isPasswordCorrect) {
      const { password, ...userDetails } = user._doc;
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
      return res.send({
        token: token,
        ...userDetails,
      });
    }

    res.status(401).json({ message: "Email or password are incorrect!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.createUser = createUser;
exports.loginUser = loginUser;
