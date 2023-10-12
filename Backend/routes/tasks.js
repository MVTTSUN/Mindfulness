const router = require('express').Router();
const { uploadTasks } = require('../middlewares/gridfs');
const { postTaskCelebrate } = require('../middlewares/celebrate');
const { postTask, getTask, getTasks, getTaskFile } = require('../controllers/tips');

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.get('/tasks/:filename', getTaskFile);
router.post('/tasks', postTaskCelebrate, uploadTasks.array('file'), postTask);

module.exports = router;
