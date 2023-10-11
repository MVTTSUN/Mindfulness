const router = require('express').Router();
const upload = require('../middlewares/gridfs');
// const { postTipCelebrate } = require('../middlewares/celebrate');
const { getTips, postTips, deleteTips } = require('../controllers/tips');

router.get('/tips', getTips);
router.post('/tips', upload.single('file'), postTips);
router.delete('/tips', deleteTips);

module.exports = router;
