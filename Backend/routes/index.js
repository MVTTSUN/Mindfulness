const router = require('express').Router();
const userRouter = require('./users');
const meditationRouter = require('./meditations');
const otherRouter = require('./other');
const tipRouter = require('./tips');
const emotionRouter = require('./emotions');
const infoRouter = require('./info');
const taskRouter = require('./tasks');
const statisticRouter = require('./statistics');

router.use('/auth', userRouter);
router.use('/info', infoRouter);
router.use('/tips', tipRouter);
router.use('/emotions', emotionRouter);
router.use('/tasks', taskRouter);
router.use('/meditations', meditationRouter);
router.use('/statistics', statisticRouter);

router.use(otherRouter);

module.exports = router;
