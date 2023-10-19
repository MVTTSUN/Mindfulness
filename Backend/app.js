const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const limiter = require('./middlewares/rateLimit');
const indexRouter = require('./routes/index');
const errorsMiddleware = require('./middlewares/errors');
const corsMiddleware = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DEV_DATABASE_URL } = require('./config');
require('dotenv').config();

const { PORT = 3000, DATABASE_URL, NODE_ENV } = process.env;

const app = express();
const server = http.createServer(app).listen(PORT, '192.168.1.111');
const { io } = require('./utils/socket');

io.attach(server, {
  cors: {
    origin: ['https://localhost:5173', 'http://localhost:5173'],
  },
});

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cookieParser());
app.use(corsMiddleware);
app.use(limiter);

app.use(requestLogger);

app.use(indexRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorsMiddleware);

// app.listen(PORT);
