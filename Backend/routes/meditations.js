const router = require('express').Router();
const { uploadMeditations } = require('../middlewares/gridfs');
const {
  postMeditationCelebrate,
  deleteMeditationCelebrate,
  patchMeditationCelebrate,
} = require('../middlewares/celebrate');
const {
  postMeditation,
  postMeditationUnique,
  getMeditation,
  getMeditations,
  getMeditationFile,
  deleteMeditation,
  patchMeditation,
  patchMeditationUnique,
} = require('../controllers/meditations');
const statisticsMiddleware = require('../middlewares/statistics');
const authMiddleware = require('../middlewares/auth');

router.get('/', getMeditations);
router.get('/:id', statisticsMiddleware, getMeditation);
router.get('/filename/:filename', getMeditationFile);
router.post('/validate', authMiddleware, postMeditationCelebrate, postMeditationUnique);
router.post('/', authMiddleware, uploadMeditations.array('file'), postMeditation);
router.delete('/:id', authMiddleware, deleteMeditationCelebrate, deleteMeditation);
router.patch('/validate/:id', authMiddleware, patchMeditationCelebrate, patchMeditationUnique);
router.patch('/:id', authMiddleware, uploadMeditations.array('file'), patchMeditation);

module.exports = router;
