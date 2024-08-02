const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const orderRouter = require('./routes/orderRouter');
const orderItemRouter = require('./routes/orderItemRouter');
const formatsRouter = require('./routes/formatVinylRouter');
const vinylsRouter = require('./routes/vinylsRouter');
const trackRouter = require('./routes/tracksRouter');
const trackListsRouter = require('./routes/trackListsRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/ordersItems', orderItemRouter)
app.use('/api/formats', formatsRouter);
app.use('/api/vinyls', vinylsRouter);
app.use('/api/tracks', trackRouter);
app.use('/api/trackLists', trackListsRouter);


module.exports = app;
