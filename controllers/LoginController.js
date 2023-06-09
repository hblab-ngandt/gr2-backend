const { ethers } = require('ethers');
const model = require('../models');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const { USER } = require('../constants/user');
const { ERROR_MESSAGE } = require('../constants/error_message');

dotenv.config();

const login = async (req, res) => {
  try {
    let data = [];
    if (req.body.walletAddress) {
      const user = await model.User.findOne({
        where: {
          walletAddress: req.body.walletAddress
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
          username: newUser?.username || '',
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
        data = {
          user: user,
          accessToken,
          message: 'Login successful'
        };
        return res.send({ result: data });
      }
    }
    return res.status(400).send(ERROR_MESSAGE.invalid_address);
  } catch (err) {
    res.status(500).send(ERROR_MESSAGE[500]);
  }
};
const validate = async (req, res) => {
  if (req.headers.authorization || req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token, "secret");
    return res.send({
      login: true,
      data: decode,
    });
  } else {
    return res.send({
      login: false,
      data: "error",
    });
  }
};
module.exports = { login, validate };