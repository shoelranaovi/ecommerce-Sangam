const express = require("express");
const errorHandler = require("../middleware/errorhandler");
const authController = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyuser");
authController.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    console.log(username, email, password);
    if (!username || !email || !password) {
      return next(errorHandler(400, "plz provide your details"));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "plz provide your details"));
    }
    const pattren = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //check the pattern
    if (!email.match(pattren)) {
      return next(errorHandler(400, "plz provide valid email"));
    }
    if (username.length <= 4) {
      return next(errorHandler(400, "username should be 8 charactor or more"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const payload = {
      username,
      email,
      password: hash,
    }; //  create user using payload

    const newUser = new User(payload); ///create user user model
    const saveUser = await newUser.save();
    res.status(200).json({
      message: "user create successfull",
      data: saveUser,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler());
  }
});
authController.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(errorHandler(400, "plz provide your information"));
    }
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return next(errorHandler(400, "plz provide valid email"));
    } else {
      const comparePass = await bcrypt.compareSync(password, finduser.password);
      if (!comparePass) {
        return next(errorHandler(400, "plz provide correct Password"));
      }

      const tokendata = {
        id: finduser._id,
        email: finduser.email,
        role: finduser.role,
      };
      const token = jwt.sign(tokendata, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
      const tokenoption = {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
        securce: true,
      };
      const userinfromation = {
        id: finduser._id,
        username: finduser.username,
        email: finduser.email,
        role: finduser.role,
      };
      res.status(201).cookie("token", token, tokenoption).json({
        message: "successfully login",
        data: userinfromation,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, error.message));
  }
});
authController.get("/checkuser", verifyToken, async (req, res, next) => {
  const user = req.user;
  try {
    const finduser = await User.findById(user.id);
    const userinfromation = {
      id: finduser._id,
      username: finduser.username,
      email: finduser.email,
      role: finduser.role,
    };
    res.status(201).json({
      message: "successfully login",
      data: userinfromation,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler());
  }
});
authController.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token").json({
      message: "your are sign out",

      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler());
  }
});

module.exports = authController;
