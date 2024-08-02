const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const formatsRouter = require('./routes/formatVinylRouter');
const vinylsRouter = require('./routes/vinylsRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/formats', formatsRouter);
app.use('/api/vinyls', vinylsRouter);

module.exports = app;
