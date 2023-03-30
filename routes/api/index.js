const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const { login } = require('../../controllers/LoginController');

const router = express.Router();

router.post('/login', login);

module.exports = router;

