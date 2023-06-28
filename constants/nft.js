const NFT = {
  STATUS: {
    NEW: 1,
    SELL: 2,
    BOUGHT: 3,
    CANCEL_SELL: 4
  },
};

const {
  NFT_ADDRESS,
  MARKETPLACE_ADDRESS
} = process.env;

module.exports = {
  NFT,
  NFT_ADDRESS,
  MARKETPLACE_ADDRESS
};
