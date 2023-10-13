const router = require('express').Router();
const { postEmotionCelebrate } = require('../middlewares/celebrate');
const { getEmotions, postEmotions, deleteEmotion } = require('../controllers/emotions');

router.get('/emotions', getEmotions);
router.post('/emotions', postEmotionCelebrate, postEmotions);
router.delete('/emotions/:id', deleteEmotion);

module.exports = router;
