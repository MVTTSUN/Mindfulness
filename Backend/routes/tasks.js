const router = require('express').Router();
const { uploadTasks } = require('../middlewares/gridfs');
const {
  postTaskCelebrate,
  deleteTaskCelebrate,
  patchTaskCelebrate,
} = require('../middlewares/celebrate');
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
router.post('/tasks', postTaskCelebrate, uploadTasks.array('file'), postTask);
router.delete('/tasks/:id', deleteTaskCelebrate, deleteTask);
router.patch('/tasks/:id', patchTaskCelebrate, uploadTasks.array('file'), patchTask);

module.exports = router;
