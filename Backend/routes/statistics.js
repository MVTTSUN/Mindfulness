const router = require('express').Router();
const { getStatistics } = require('../controllers/statistics');

router.get('/statistics', getStatistics);

module.exports = router;
