const router = require('express').Router();
const { uploadInfo } = require('../middlewares/gridfs');
const { postInfoCelebrate } = require('../middlewares/celebrate');
const { postInfo, getInfo, getInfoFile } = require('../controllers/info');

router.get('/info', getInfo);
router.get('/info/filename/:filename', getInfoFile);
router.post('/info', postInfoCelebrate, uploadInfo.array('file'), postInfo);

module.exports = router;
