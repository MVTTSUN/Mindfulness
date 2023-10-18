const router = require('express').Router();
const { uploadMeditations } = require('../middlewares/gridfs');
const {
  postMeditationCelebrate,
  deleteMeditationCelebrate,
  patchMeditationCelebrate,
} = require('../middlewares/celebrate');
const {
  postMeditation,
  getMeditation,
  getMeditations,
  getMeditationFile,
  deleteMeditation,
  patchMeditation,
} = require('../controllers/meditations');
const statisticsMiddleware = require('../middlewares/statistics');

router.get('/meditations', getMeditations);
router.get('/meditations/:id', statisticsMiddleware, getMeditation);
router.get('/meditations/filename/:filename', getMeditationFile);
router.post(
  '/meditations',
  postMeditationCelebrate,
  uploadMeditations.array('file'),
  postMeditation
);
router.delete('/meditations/:id', deleteMeditationCelebrate, deleteMeditation);
router.patch(
  '/meditations/:id',
  patchMeditationCelebrate,
  uploadMeditations.array('file'),
  patchMeditation
);

module.exports = router;
