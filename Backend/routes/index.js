const router = require('express').Router();
// const userRouter = require('./users');
const meditationRouter = require('./meditations');
const otherRouter = require('./other');
// const authRouter = require('./auth');
const tipRouter = require('./tips');
const emotionRouter = require('./emotions');
const infoRouter = require('./info');
const taskRouter = require('./tasks');
const statisticRouter = require('./statistics');
// const authMiddleware = require('../middlewares/auth');

// router.use(authRouter);
// router.use(authMiddleware);
// router.use(userRouter);
router.use(infoRouter);
router.use(tipRouter);
router.use(emotionRouter);
router.use(taskRouter);
router.use(meditationRouter);
router.use(statisticRouter);

router.use(otherRouter);

module.exports = router;
