const router = require('express').Router();
const { postEmotionCelebrate } = require('../middlewares/celebrate');
const { getEmotions, postEmotions, deleteEmotion } = require('../controllers/emotions');
const authMiddleware = require('../middlewares/auth');

router.get('/', getEmotions);
router.post('/', authMiddleware, postEmotionCelebrate, postEmotions);
router.delete('/:id', authMiddleware, deleteEmotion);

module.exports = router;
