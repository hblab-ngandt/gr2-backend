const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk');

dotenv.config();

const region = process.env.REGION;
const bucket = process.env.BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});

const { login, validate } = require('../../controllers/LoginController');
const { myProfile, update } = require('../../controllers/ProfileController');
const {
  uploadImage,
  createNft,
  getMyNft,
  sellNft,
  getMarketplace
} = require('../../controllers/NftController');

const router = express.Router();

router.post('/api/login', login);
router.get('/validate', validate);
router.post('/api/user/profile', myProfile);
router.post('/api/user/update', upload.fields([
  { name: 'images', maxCount: 1 },
]), update);
router.post('/api/nft/upload', upload.fields([
  { name: 'images', maxCount: 1 },
]), uploadImage);
router.post('/api/nft/create', createNft);
router.post('/api/nft/my-nft', getMyNft);
router.post('/api/nft/sell-nft', sellNft);
router.post('/api/nft/marketplaces', getMarketplace);

module.exports = router;

