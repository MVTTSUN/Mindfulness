const router = require('express').Router();
const { getStatistics } = require('../controllers/statistics');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, getStatistics);

module.exports = router;
