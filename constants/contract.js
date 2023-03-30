const { ethers } = require('ethers');
const ImageToken = require('./ImageToken.json');
const ImageMarketplace = require('./ImageMarketplace.json');

const {
  NFT_ADDRESS,
  MARKETPLACE_ADDRESS
} = process.env;

// const provider = new ethers.BrowserProvider(window.ethereum);
// const signer = provider.getSigner();
// const nftAddress = NFT_ADDRESS;
// const marketplaceAddress = MARKETPLACE_ADDRESS;

// const nftContract = new ethers.Contract(
//   nftAddress,
//   ImageToken.abi,
//   signer);

// const marketplaceContract = new ethers.Contract(
//   marketplaceAddress,
//   ImageMarketplace.abi,
//   signer
// );

// module.exports = {
//   nftContract,
//   marketplaceContract,
// };
