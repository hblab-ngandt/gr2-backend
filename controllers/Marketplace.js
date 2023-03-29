import { marketplaceContract } from '../constants/contract';
import { ethers } from "ethers";

const SellNft = async (req, res) => {
  try {

  } catch (err) {
    console.log(err);
  }
};

const BuyNft = async (req, res) => {
  try {
    let priceInput = req.params.price;
    let tokenId = req.params.tokenId;
    let price = ethers.utils.parseUnits(priceInput, 'ether');

    let marketTx = await marketplaceContract.listImageNFT(price, tokenId);
    let tx = await marketTx.wait();

  } catch (err) {
    console.log(err);
  }
};

const CancelSellNft = async (req, res) => {
  try {

  } catch (err) {
    console.log(err);
  }
};

export {
  SellNft,
  BuyNft,
  CancelSellNft
}