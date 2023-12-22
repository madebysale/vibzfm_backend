import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import publicRoutes from './src/routes/public';
// const {exphbs} = require('express-handlebars');
// const express = require('express');
const path = require('path');


import apiRoutes from './src/routes/api';
// import adminRoutes from './src/routes/admin';
// import apiMiddleware from './src/middleware/apiAuth';
// import adminMiddleware from './src/middleware/adminAuth';
import errorHandler from './src/middleware/errorHandler';
import decryptMiddleware from './src/middleware/decryptBody';

const multer = require("multer");
// const upload = multer({
//     dest: "./assets/images/"
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.png') //Appending .jpg
  }
});

var upload = multer({ storage: storage });

var uploadImage = upload.any();



dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);



var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use('https://api.familyfm.ltd/Vibz_FM/uploads',express.static('uploads'))

// const staticFolderPath = path.join(__dirname, 'uploads');

// // Serve the static folder at the specified path
// app.use('/uploads', express.static(staticFolderPath));

app.use((req, res, next) => {
  console.log(`Received request for: ${req.url}`);
  next();
});

app.use(bodyParser.json());
app.use('/api/public', publicRoutes);



// app.use('/api/v1', uploadImage, apiMiddleware, apiRoutes);
// app.use('/api/admin', apiMiddleware, adminMiddleware, adminRoutes);

// app.use(errorHandler);

// app.use(express.static('assets/images'));




module.exports = app;
