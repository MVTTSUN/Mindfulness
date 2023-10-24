const router = require('express').Router();
const { uploadInfo } = require('../middlewares/gridfs');
const { postInfoCelebrate } = require('../middlewares/celebrate');
const { postInfo, getInfo, getInfoFile } = require('../controllers/info');
const authMiddleware = require('../middlewares/auth');

router.get('/', getInfo);
router.get('/filename/:filename', getInfoFile);
router.post('/', authMiddleware, postInfoCelebrate, uploadInfo.array('file'), postInfo);

module.exports = router;
