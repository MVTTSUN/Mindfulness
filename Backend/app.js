const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const limiter = require('./middlewares/rateLimit');
const indexRouter = require('./routes/index');
const errorsMiddleware = require('./middlewares/errors');
const corsMiddleware = require('./middlewares/cors');
const { startDBConnect } = require('./dbConnect');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

startDBConnect();

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

app.listen(PORT);
