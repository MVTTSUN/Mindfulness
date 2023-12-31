const Statistic = require('../models/statistic');

const getStatistics = async (_, res, next) => {
  try {
    const statistics = await Statistic.find({});

    res.send(statistics[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStatistics,
};
