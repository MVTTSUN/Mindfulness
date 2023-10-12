const router = require('express').Router();
const { postEmotionCelebrate } = require('../middlewares/celebrate');
const { getEmotions, postEmotions } = require('../controllers/emotions');

router.get('/emotions', getEmotions);
router.post('/emotions', postEmotionCelebrate, postEmotions);

module.exports = router;
