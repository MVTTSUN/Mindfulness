const router = require('express').Router();
const { uploadTips } = require('../middlewares/gridfs');
const { postTipCelebrate } = require('../middlewares/celebrate');
const { postTips, getTips, getTipFile } = require('../controllers/tips');

router.get('/tips', getTips);
router.get('/tips/filename/:filename', getTipFile);
router.post('/tips', postTipCelebrate, uploadTips.array('file'), postTips);

module.exports = router;
