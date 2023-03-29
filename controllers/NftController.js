import { create } from 'ipfs-http-client';
const { nftContract } = require('../constants/contract');

const model = require('../models');
const baseImage = require('../constants/index');

const ipfs_id = process.env.IPFS_ID;
const ipfs_key = process.env.IPFS_KEY;

const authorization = 'Basic ' + Buffer.from(ipfs_id + ':' + ipfs_key).toString('base64');
const ipfs = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

const createNft = async (req, res) => {
  try {
    const { image } = req.files;    
    const hashImage = await ipfs.add(image[0].path);
    console.log(hashImage);

    const url = baseImage + hashImage;
    const address = req.params.address;

    let nftTx = await nftContract.safeMint(address, url);
    let tx = await nftTx.wait();
    
    const tokenId = tx.logs[0].topics[3];
    console.log(`See transaction: https://testnet.bscscan.com/tx/${tx.transactionHash}`);
    console.log('token id: ', tokenId);

    await model.Nft.create({
      tokenId,
      address,
      url,
    });
    
    return res.send({message: 'Create nft successfully'});
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createNft };