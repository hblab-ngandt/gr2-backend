const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const { createNft } = require('../../controllers/NftController');

router.post('/nft/create', createNft);

module.exports = router;

