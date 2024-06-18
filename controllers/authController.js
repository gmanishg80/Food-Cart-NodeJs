const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }

    const existing = await userModel.findOne({ email: email });

    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already exist please Login with other email",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password:hashPassword,
      address,
      phone,
      answer
    });

    if(!user){
    res.status(500).send({
        success: false,
        message: "user cannot be registered, try again",
      });
    }

    res.status(201).send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register Api",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("here2")
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
      // console.log("here1")
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email donot match",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(500).send({
            success: false,
            message: "invalid credentials"
        });
    } 

    const token = JWT.sign({id:user.id}, process.env.jwt_secret, {
      expiresIn: "7d",
    });

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "user login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register Api",
      error,
    });
  }
};

module.exports = { registerController, loginController };
