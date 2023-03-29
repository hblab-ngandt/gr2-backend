const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const apiRoute = require('./routes/api/index');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiRoute);

app.listen(PORT, () => {
  console.log(`Server is connected on ${PORT}`)
  console.log(`http://localhost:${PORT}`);
});
