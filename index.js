const express = require('express');
const sequelize = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const apiRoutes = require('./routes/api');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data

app.use(cors());

app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is connected on ${PORT}`)
  console.log(`http://localhost:${PORT}`);
});
