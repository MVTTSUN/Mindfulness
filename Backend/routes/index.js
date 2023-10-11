const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const otherRouter = require('./other');
const authRouter = require('./auth');
const tipRouter = require('./tips');
// const authMiddleware = require('../middlewares/auth');

router.use(authRouter);
router.use(tipRouter);
// router.use(authMiddleware);
router.use(userRouter);
router.use(movieRouter);
router.use(otherRouter);

module.exports = router;
