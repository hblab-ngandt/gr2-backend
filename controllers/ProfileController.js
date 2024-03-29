const { ethers, utils } = require('ethers');
const model = require('../models');
const dotenv = require('dotenv');
const create =  require("ipfs-http-client");

const { USER } = require('../constants/user');
const { ERROR_MESSAGE } = require('../constants/error_message');
const { Op } = require('sequelize');

dotenv.config();

const myProfile = async (req, res) => {
  try {
    const user = await model.User.findOne({
      where: {
        walletAddress: req.body.walletAddress
      },
    });
    if (user) {
      return res.send({ user: user });
    }
    return res.status(400).send({ message: 'User not valid' });
  } catch (err) {
    console.log(err);
    res.status(500).send(ERROR_MESSAGE[500]);
  }
}

const update = async (req, res) => {
  try {
    const user = await model.User.findOne({
      where: {
        walletAddress: req.body.walletAddress
      },
    });
    if (user) {
      let existUser;
      if (req.body.username) {
        existUser = await model.User.findOne({
          where: { username: req.body.username, id: { [Op.ne]: user.id } },
        });
      }
      if (existUser) {
        return res.status(400).send({ message: 'This username already exists' });
      }
      const image = req.files;
      console.log(image);

      await user.update({
        username: req.body.username ? req.body.username : user.username,
        birthday: req.body.birthday ? req.body.birthday : user.birthday,
        profile: image && image.images ? `${image.images[0].location}`: user.profile,
        about: req.body.about ? req.body.about : user.about,
        phone: req.body.phone ? req.body.phone : user.phone,
        address: req.body.address ? req.body.address : user.address,
      });
      return res.send({ message: 'Update profile succesfully' });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { myProfile, update };
