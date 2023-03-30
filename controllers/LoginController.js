const { ethers } = require('ethers');
const model = require('../models');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const { USER } = require('../constants/user');
const { ERROR_MESSAGE } = require('../constants/error_message');

dotenv.config();

const login = async (req, res) => {
  try {
    const checkAddress = ethers.isAddress(req.body.walletAddress);
    console.log(checkAddress);
    if (checkAddress) {
      const user = await model.User.findOne({
        where: {
          walletAddress: ethers.getAddress(req.body.walletAddress)
        },
      });
      if (!user) {
        const newUser = await model.User.create({
          username: req.body.username || '',
          walletAddress: ethers.getAddress(req.body.walletAddress),
          status: USER.STATUS.NEW,
          role: USER.ROLE.NORMAL,
        });
        const accessToken  = jwt.sign(
          { "walletAddress": newUser.walletAddress },
          process.env.ACCESS_TOKEN_SECRET,
          { algorithm: "HS256",
            expiresIn: '1h',
          }
        );
        return res.send({
          accessToken,
          message: 'Login new user successful'
        });
      } else {
        const accessToken  = jwt.sign(
          { "walletAddress": user.walletAddress },
          process.env.ACCESS_TOKEN_SECRET,
          { algorithm: "HS256",
            expiresIn: '1h',
          }
        );
        return res.send({
          accessToken,
          message: 'Login successful'
        });
      }
    }
    return res.status(400).send(ERROR_MESSAGE.invalid_address);
  } catch (err) {
    res.status(500).send(ERROR_MESSAGE[500]);
  }
};

module.exports = { login };