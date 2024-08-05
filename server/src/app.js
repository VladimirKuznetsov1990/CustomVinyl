const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const orderRouter = require('./routes/orderRouter');
const formatsRouter = require('./routes/formatVinylRouter');
const trackRouter = require('./routes/tracksRouter');
const trackListsRouter = require('./routes/trackListsRouter');

const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/formats', formatsRouter);
app.use('/api/tracks', trackRouter);
app.use('/api/trackLists', trackListsRouter);


module.exports = app;
