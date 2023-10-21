const router = require('express').Router();
const { uploadTasks } = require('../middlewares/gridfs');
const {
  postTaskCelebrate,
  deleteTaskCelebrate,
  patchTaskCelebrate,
} = require('../middlewares/celebrate');
const {
  postTask,
  postTaskUnique,
  getTask,
  getTasks,
  getTaskFile,
  deleteTask,
  patchTask,
  patchTaskUnique,
} = require('../controllers/tasks');
const statisticsMiddleware = require('../middlewares/statistics');

router.get('/tasks', getTasks);
router.get('/tasks/:id', statisticsMiddleware, getTask);
router.get('/tasks/filename/:filename', getTaskFile);
router.post('/tasks/validate', uploadTasks.any(), postTaskCelebrate, postTaskUnique);
router.post('/tasks', uploadTasks.array('file'), postTask);
router.delete('/tasks/:id', deleteTaskCelebrate, deleteTask);
router.patch('/tasks/validate/:id', uploadTasks.any(), patchTaskCelebrate, patchTaskUnique);
router.patch('/tasks/:id', uploadTasks.array('file'), patchTask);

module.exports = router;
