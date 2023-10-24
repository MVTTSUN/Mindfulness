const router = require('express').Router();
const { uploadTips } = require('../middlewares/gridfs');
const { postTipCelebrate } = require('../middlewares/celebrate');
const { postTips, getTips, getTipFile } = require('../controllers/tips');
const authMiddleware = require('../middlewares/auth');

router.get('/', getTips);
router.get('/filename/:filename', getTipFile);
router.post('/', authMiddleware, postTipCelebrate, uploadTips.array('file'), postTips);

module.exports = router;
