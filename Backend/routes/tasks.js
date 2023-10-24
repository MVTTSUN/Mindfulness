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
const authMiddleware = require('../middlewares/auth');

router.get('/', getTasks);
router.get('/:id', statisticsMiddleware, getTask);
router.get('/filename/:filename', getTaskFile);
router.post('/validate', authMiddleware, uploadTasks.any(), postTaskCelebrate, postTaskUnique);
router.post('/', authMiddleware, uploadTasks.array('file'), postTask);
router.delete('/:id', authMiddleware, deleteTaskCelebrate, deleteTask);
router.patch(
  '/validate/:id',
  authMiddleware,
  uploadTasks.any(),
  patchTaskCelebrate,
  patchTaskUnique
);
router.patch('/:id', authMiddleware, uploadTasks.array('file'), patchTask);

module.exports = router;
