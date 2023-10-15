const router = require('express').Router();
// const userRouter = require('./users');
// const movieRouter = require('./movies');
const otherRouter = require('./other');
// const authRouter = require('./auth');
const tipRouter = require('./tips');
const emotionRouter = require('./emotions');
const infoRouter = require('./info');
const taskRouter = require('./tasks');
// const authMiddleware = require('../middlewares/auth');

// router.use(authRouter);
// router.use(authMiddleware);
// router.use(userRouter);
router.use(infoRouter);
router.use(tipRouter);
router.use(emotionRouter);
router.use(taskRouter);
router.use(otherRouter);

module.exports = router;
