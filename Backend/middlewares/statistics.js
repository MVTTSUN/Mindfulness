const Meditation = require('../models/meditation');
const Task = require('../models/task');
const Statistic = require('../models/statistic');
const { Socket } = require('../utils/socket');
const IncorrectError = require('../errors/incorrectError');
const { errorMessages } = require('../const');

module.exports = async (req, _, next) => {
  try {
    const { url, headers, originalUrl } = req;
    const { id } = req.params;
    const statistics = await Statistic.find({});
    const device = headers['user-agent']
      .match(/(?<=\().*?(?=;)/)[0]
      .split(' ')[0]
      .toLowerCase();
    let updateStatistics;
    let updatedDataStatisticsMeditation;
    let updatedDataStatisticsTask;

    if (statistics.length !== 0) {
      const statistic = statistics[0];
      const allCount = statistic.count ? statistic.count + 1 : 1;
      updatedDataStatisticsMeditation = statistic.meditations;
      updatedDataStatisticsTask = statistic.tasks;

      const updateDataStatistics = (title, statisticItem) => {
        const statisticItemCopy = JSON.parse(JSON.stringify(statisticItem));

        if (statisticItemCopy.length !== 0) {
          for (let i = 0; i < statisticItemCopy.length; i += 1) {
            if (statisticItemCopy[i].title === title) {
              if (statisticItemCopy[i].years.length !== 0) {
                for (let j = 0; j < statisticItemCopy[i].years.length; j += 1) {
                  if (statisticItemCopy[i].years[j].year === new Date().getFullYear()) {
                    if (statisticItemCopy[i].years[j].months.length !== 0) {
                      for (let k = 0; k < statisticItemCopy[i].years[j].months.length; k += 1) {
                        if (
                          statisticItemCopy[i].years[j].months[k].month === new Date().getMonth()
                        ) {
                          statisticItemCopy[i].years[j].months[k].count += 1;
                          if (device === 'windows') {
                            statisticItemCopy[i].years[j].months[k].android += 1;
                          } else {
                            statisticItemCopy[i].years[j].months[k].ios += 1;
                          }

                          break;
                        }
                        if (k === statisticItemCopy[i].years[j].months.length - 1) {
                          let countAndroidScope = 0;
                          let countIOSScope = 0;

                          if (device === 'windows') {
                            countAndroidScope = 1;
                          } else {
                            countIOSScope = 1;
                          }

                          statisticItemCopy[i].years[j].months.push({
                            month: new Date().getMonth(),
                            count: 1,
                            android: countAndroidScope,
                            ios: countIOSScope,
                          });

                          break;
                        }
                      }
                    } else {
                      let countAndroidScope = 0;
                      let countIOSScope = 0;

                      if (device === 'windows') {
                        countAndroidScope = 1;
                      } else {
                        countIOSScope = 1;
                      }

                      statisticItemCopy[i].years[j].months.push({
                        month: new Date().getMonth(),
                        count: 1,
                        android: countAndroidScope,
                        ios: countIOSScope,
                      });
                    }

                    statisticItemCopy[i].years[j].count += 1;

                    break;
                  }
                  if (j === statisticItemCopy[i].years.length - 1) {
                    let countAndroidScope = 0;
                    let countIOSScope = 0;

                    if (device === 'windows') {
                      countAndroidScope = 1;
                    } else {
                      countIOSScope = 1;
                    }

                    statisticItemCopy[i].years.push({
                      year: new Date().getFullYear(),
                      count: 1,
                      months: [
                        {
                          month: new Date().getMonth(),
                          count: 1,
                          android: countAndroidScope,
                          ios: countIOSScope,
                        },
                      ],
                    });

                    break;
                  }
                }
              } else {
                let countAndroidScope = 0;
                let countIOSScope = 0;

                if (device === 'windows') {
                  countAndroidScope = 1;
                } else {
                  countIOSScope = 1;
                }

                statisticItemCopy[i].years.push({
                  year: new Date().getFullYear(),
                  count: 1,
                  months: [
                    {
                      month: new Date().getMonth(),
                      count: 1,
                      android: countAndroidScope,
                      ios: countIOSScope,
                    },
                  ],
                });
              }

              statisticItemCopy[i].count += 1;

              break;
            }
            if (i === statisticItemCopy.length - 1) {
              let countAndroidScope = 0;
              let countIOSScope = 0;

              if (device === 'windows') {
                countAndroidScope = 1;
              } else {
                countIOSScope = 1;
              }

              statisticItemCopy.push({
                title,
                count: 1,
                years: [
                  {
                    year: new Date().getFullYear(),
                    count: 1,
                    months: [
                      {
                        month: new Date().getMonth(),
                        count: 1,
                        android: countAndroidScope,
                        ios: countIOSScope,
                      },
                    ],
                  },
                ],
              });

              break;
            }
          }
        } else {
          let countAndroidScope = 0;
          let countIOSScope = 0;

          if (device === 'windows') {
            countAndroidScope = 1;
          } else {
            countIOSScope = 1;
          }

          statisticItemCopy.push({
            title,
            count: 1,
            years: [
              {
                year: new Date().getFullYear(),
                count: 1,
                months: [
                  {
                    month: new Date().getMonth(),
                    count: 1,
                    android: countAndroidScope,
                    ios: countIOSScope,
                  },
                ],
              },
            ],
          });
        }

        return statisticItemCopy;
      };

      if (url.includes('meditations') || originalUrl.includes('meditations')) {
        const { title } = await Meditation.findOne({ _id: id });

        updatedDataStatisticsMeditation = updateDataStatistics(title, statistic.meditations);
      }

      if (url.includes('tasks') || originalUrl.includes('tasks')) {
        const { title } = await Task.findOne({ _id: id });

        updatedDataStatisticsTask = updateDataStatistics(title, statistic.tasks);
      }

      updateStatistics = await Statistic.findByIdAndUpdate(
        statistic._id,
        {
          meditations: updatedDataStatisticsMeditation,
          tasks: updatedDataStatisticsTask,
          count: allCount,
        },
        { new: true, runValidators: true }
      );
    } else {
      if (url.includes('meditations') || originalUrl.includes('meditations')) {
        const { title } = await Meditation.findOne({ _id: id });
        let androidCount = 0;
        let IOSCount = 0;

        if (device === 'windows') {
          androidCount = 1;
        } else {
          IOSCount = 1;
        }

        updateStatistics = await Statistic.create({
          meditations: [
            {
              title,
              count: 1,
              years: [
                {
                  year: new Date().getFullYear(),
                  months: [
                    {
                      month: new Date().getMonth(),
                      count: 1,
                      android: androidCount,
                      ios: IOSCount,
                    },
                  ],
                  count: 1,
                },
              ],
            },
          ],
          tasks: [],
          count: 1,
        });
      }

      if (url.includes('tasks') || originalUrl.includes('tasks')) {
        const { title } = await Task.findOne({ _id: id });
        let androidCount = 0;
        let IOSCount = 0;

        if (device === 'windows') {
          androidCount = 1;
        } else {
          IOSCount = 1;
        }

        updateStatistics = await Statistic.create({
          meditations: [],
          tasks: [
            {
              title,
              count: 1,
              years: [
                {
                  year: new Date().getFullYear(),
                  months: [
                    {
                      month: new Date().getMonth(),
                      count: 1,
                      android: androidCount,
                      ios: IOSCount,
                    },
                  ],
                  count: 1,
                },
              ],
            },
          ],
          count: 1,
        });
      }
    }

    Socket.emit('statistics', updateStatistics);
  } catch (err) {
    next(new IncorrectError(errorMessages.INCORRECT_DATA));
  }

  next();
};
