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

router.get('/meditations', getMeditations);
router.get('/meditations/:id', statisticsMiddleware, getMeditation);
router.get('/meditations/filename/:filename', getMeditationFile);
router.post(
  '/meditations/validate',
  uploadMeditations.any(),
  postMeditationCelebrate,
  postMeditationUnique
);
router.post('/meditations', uploadMeditations.array('file'), postMeditation);
router.delete('/meditations/:id', deleteMeditationCelebrate, deleteMeditation);
router.patch(
  '/meditations/validate/:id',
  uploadMeditations.any(),
  patchMeditationCelebrate,
  patchMeditationUnique
);
router.patch('/meditations/:id', uploadMeditations.array('file'), patchMeditation);

module.exports = router;
