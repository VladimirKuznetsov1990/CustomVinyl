const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');


const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);

module.exports = app;