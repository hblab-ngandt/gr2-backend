const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const { login, validate } = require('../../controllers/LoginController');

const router = express.Router();

router.post('/api/login', login);
router.get('/validate', validate);

module.exports = router;

