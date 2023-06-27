const model = require('../models');
const dotenv = require('dotenv');

dotenv.config();

const uploadImage = async (req, res) => {
  try {
    const file = req.files;
    return res.status(200).send({ message: 'Upload file successfully', image: file.images[0].location });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'Failed to upload file' });
  }
}

const createNft = async (req, res) => {
  try {
    const nft = {
      nftId: req.body.nftId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      created_by: req.body.owner,
      owner: req.body.owner
    };
    await model.Nft.create(nft);
    return res.send({ message: 'Create NFT successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'Failed to create NFT' });
  }
}

module.exports = { uploadImage, createNft };
