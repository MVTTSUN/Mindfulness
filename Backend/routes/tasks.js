const router = require('express').Router();
const { uploadTasks } = require('../middlewares/gridfs');
// const { postTaskCelebrate } = require('../middlewares/celebrate');
const {
  postTask,
  getTask,
  getTasks,
  getTaskFile,
  deleteTask,
  patchTask,
} = require('../controllers/tasks');

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.get('/tasks/filename/:filename', getTaskFile);
router.post('/tasks', uploadTasks.array('file'), postTask);
router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/:id', uploadTasks.array('file'), patchTask);

module.exports = router;
