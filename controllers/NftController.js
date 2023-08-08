const model = require('../models');
const dotenv = require('dotenv');
const { NFT, MARKETPLACE_ADDRESS } = require('../constants/nft');
const { Op } = require('sequelize');

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
      owner: req.body.owner,
      status: NFT.STATUS.NEW
    };
    await model.Nft.create(nft);
    return res.send({ message: 'Create NFT successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'Failed to create NFT' });
  }
}

const getMyNft = async (req, res) => {
  try {
    const result = await model.Nft.findAll({
      where: {
        [Op.and]: [
          { created_by: req.body.walletAddress },
          { owner: req.body.walletAddress },
        ]
      },
    });
    return res.send({ nfts: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'Get list nft success' });
  }
}

const sellNft = async (req, res) => {
  try {
    const nft = await model.Nft.findOne({
      where: {
        nftId: req.body.nftId,
        created_by: req.body.walletAddress
      }
    });
    if (nft) {
      await nft.update({
        status: NFT.STATUS.SELL,
        owner: MARKETPLACE_ADDRESS,
      });
      const marketplace = {
        seller: req.body.seller,
        buyer: MARKETPLACE_ADDRESS,
        nftId: req.body.nftId,
        price: req.body.price,
        type: NFT.STATUS.SELL,
        marketId: req.body.marketId,
      }
      await model.Marketplace.create(marketplace);
      return res.status(200).send({ message: 'Sell NFT successfully' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Fail to sell nft' });
  }
}

const getMarketplace = async (req, res) => {
  try {
    const data = await model.Nft.findAll({
      attributes: [
        'nftId', 'name', 'description', 'url', 'created_by', 'owner',
        [model.sequelize.col('Marketplaces.price'), 'price'],
        [model.sequelize.col('Marketplaces.seller'), 'seller'],
        [model.sequelize.col('Marketplaces.type'), 'type'],
        [model.sequelize.col('Marketplaces.marketId'), 'marketId'],
      ],
      where: {
        owner: req.body.marketplace,
      },
      include: [{
        model: model.Marketplace,
        required: true,
        where: {
          type: NFT.STATUS.SELL,
        },
        attributes: [],
      }],
    });

    return res.send({ message: 'Marketplaces founded', marketplaces: data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Failed to get marketplaces' });
  }
}

const buyNft = async (req, res) => {
  try {
    const item = await model.Marketplace.findOne({
      where:{
        type: NFT.STATUS.SELL,
        marketId: req.body.marketId
      },
    });

    await item.update({
      buyer: req.body.walletAddress,
      type: NFT.STATUS.BOUGHT,
    });

    await model.Nft.update(
      {
        status: NFT.STATUS.BOUGHT,
        created_by: req.body.walletAddress,
        owner: req.body.walletAddress,
      },
      {
        where: {
          nftId: item.nftId,
        }
      }
    );
    return res.send({ message: 'Buy nft successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Failed to buy this nft' });
  }
}

const cancelSellNft = async (req, res) => {
  try {
    const item = await model.Marketplace.findOne({
      where: {
        marketId: req.body.marketId,
        type: NFT.STATUS.SELL
      },
    });
    if (item) {
      await model.Nft.update(
        {
          owner: item.seller,
          status: NFT.STATUS.CANCEL_SELL
        }, 
        {
          where: {
            nftId: item.nftId,
          }
        },
      );
      item.destroy();
      return res.send({ message: 'Cancel nft successfully' });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Failed to cancel this nft' });
  }
}

module.exports = {
  uploadImage,
  createNft,
  getMyNft,
  sellNft,
  getMarketplace,
  buyNft,
  cancelSellNft,
};
