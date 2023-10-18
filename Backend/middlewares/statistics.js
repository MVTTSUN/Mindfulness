const Meditation = require('../models/meditation');
const Task = require('../models/task');
const Statistic = require('../models/statistic');
const { Socket } = require('../utils/socket');

module.exports = async (req, _, next) => {
  try {
    const { url, headers } = req;
    const { id } = req.params;
    const statistics = await Statistic.find({});
    const device = headers['user-agent']
      .match(/(?<=\().*?(?=;)/)[0]
      .split(' ')[0]
      .toLowerCase();
    let updateStatistics;

    if (statistics.length !== 0) {
      const statistic = statistics[0];
      const allCount = statistic.count ? statistic.count + 1 : 1;
      let years;
      let meditations;
      let tasks;
      let months;
      let month;
      let year;
      let meditation;
      let task;

      if (url.includes('meditations')) {
        const { title } = await Meditation.findOne({ _id: id });

        if (statistic.meditations.length !== 0) {
          for (let i = 0; i < statistic.meditations.length; i += 1) {
            if (statistic.meditations[i].title === title) {
              const meditationsCount = statistic.meditations[i].count + 1;

              if (statistic.meditations[i].years.length !== 0) {
                for (let j = 0; j < statistic.meditations[i].years.length; j += 1) {
                  if (statistic.meditations[i].years[j].year === new Date().getFullYear()) {
                    const yearCount = statistic.meditations[i].years[j].count + 1;
                    const currentYear = statistic.meditations[i].years[j].year;

                    if (statistic.meditations[i].years[j].months !== 0) {
                      for (
                        let k = 0;
                        k < statistic.meditations[i].years[j].months.length - 1;
                        k += 1
                      ) {
                        if (
                          statistic.meditations[i].years[j].months[k].month ===
                          new Date().getMonth()
                        ) {
                          const monthCount = statistic.meditations[i].years[j].months[k].count + 1;
                          const currentMonth = statistic.meditations[i].years[j].months[k].month;
                          let androidCount;
                          let IOSCount;

                          if (device === 'android') {
                            androidCount = statistic.meditations[i].years[j].months[k].android + 1;
                          } else {
                            IOSCount = statistic.meditations[i].years[j].months[k].ios + 1;
                          }

                          months = [...statistic.meditations[i].years[j].months];
                          months.splice(j, 1, {
                            month: currentMonth,
                            count: monthCount,
                            android: androidCount,
                            ios: IOSCount,
                          });

                          break;
                        }
                        if (k === statistic.meditations[i].years[j].months.length - 1) {
                          let countAndroidScope = 0;
                          let countIOSScope = 0;

                          if (device === 'android') {
                            countAndroidScope = 1;
                          } else {
                            countIOSScope = 1;
                          }

                          month = {
                            month: new Date().getMonth(),
                            count: 1,
                            android: countAndroidScope,
                            ios: countIOSScope,
                          };
                        }
                      }
                    } else {
                      let countAndroidScope = 0;
                      let countIOSScope = 0;

                      if (device === 'android') {
                        countAndroidScope = 1;
                      } else {
                        countIOSScope = 1;
                      }

                      month = {
                        month: new Date().getMonth(),
                        count: 1,
                        android: countAndroidScope,
                        ios: countIOSScope,
                      };
                    }

                    years = [...statistic.meditations[i].years];
                    years.splice(j, 1, {
                      year: currentYear,
                      count: yearCount,
                      months: month ? [...statistic.meditations[i].years[j].months, month] : months,
                    });

                    break;
                  }
                  if (j === statistic.meditations[i].years.length - 1) {
                    let countAndroidScope = 0;
                    let countIOSScope = 0;

                    if (device === 'android') {
                      countAndroidScope = 1;
                    } else {
                      countIOSScope = 1;
                    }

                    year = {
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
                    };
                  }
                }
              } else {
                let countAndroidScope = 0;
                let countIOSScope = 0;

                if (device === 'android') {
                  countAndroidScope = 1;
                } else {
                  countIOSScope = 1;
                }

                year = {
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
                };
              }

              meditations = [...statistic.meditations];
              meditations.splice(i, 1, {
                title,
                count: meditationsCount,
                years: year ? [...statistic.meditations[i].years, year] : years,
              });

              break;
            }
            if (i === statistic.meditations.length - 1) {
              let countAndroidScope = 0;
              let countIOSScope = 0;

              if (device === 'android') {
                countAndroidScope = 1;
              } else {
                countIOSScope = 1;
              }

              meditation = {
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
              };
            }
          }
        } else {
          let countAndroidScope = 0;
          let countIOSScope = 0;

          if (device === 'android') {
            countAndroidScope = 1;
          } else {
            countIOSScope = 1;
          }

          meditation = {
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
          };
        }
      }

      if (url.includes('tasks')) {
        const { title } = await Task.findOne({ _id: id });

        if (statistic.tasks.length !== 0) {
          for (let i = 0; i < statistic.tasks.length; i += 1) {
            if (statistic.tasks[i].title === title) {
              const tasksCount = statistic.tasks[i].count + 1;

              if (statistic.tasks[i].years.length !== 0) {
                for (let j = 0; j < statistic.tasks[i].years.length; j += 1) {
                  if (statistic.tasks[i].years[j].year === new Date().getFullYear()) {
                    const yearCount = statistic.tasks[i].years[j].count + 1;
                    const currentYear = statistic.tasks[i].years[j].year;

                    if (statistic.tasks[i].years[j].months !== 0) {
                      for (let k = 0; k < statistic.tasks[i].years[j].months.length - 1; k += 1) {
                        if (statistic.tasks[i].years[j].months[k].month === new Date().getMonth()) {
                          const monthCount = statistic.tasks[i].years[j].months[k].count + 1;
                          const currentMonth = statistic.tasks[i].years[j].months[k].month;
                          let androidCount;
                          let IOSCount;

                          if (device === 'android') {
                            androidCount = statistic.tasks[i].years[j].months[k].android + 1;
                          } else {
                            IOSCount = statistic.tasks[i].years[j].months[k].ios + 1;
                          }

                          months = [...statistic.tasks[i].years[j].months];
                          months.splice(j, 1, {
                            month: currentMonth,
                            count: monthCount,
                            android: androidCount,
                            ios: IOSCount,
                          });

                          break;
                        }
                        if (k === statistic.tasks[i].years[j].months.length - 1) {
                          let countAndroidScope = 0;
                          let countIOSScope = 0;

                          if (device === 'android') {
                            countAndroidScope = 1;
                          } else {
                            countIOSScope = 1;
                          }

                          month = {
                            month: new Date().getMonth(),
                            count: 1,
                            android: countAndroidScope,
                            ios: countIOSScope,
                          };
                        }
                      }
                    } else {
                      let countAndroidScope = 0;
                      let countIOSScope = 0;

                      if (device === 'android') {
                        countAndroidScope = 1;
                      } else {
                        countIOSScope = 1;
                      }

                      month = {
                        month: new Date().getMonth(),
                        count: 1,
                        android: countAndroidScope,
                        ios: countIOSScope,
                      };
                    }

                    years = [...statistic.tasks[i].years];
                    years.splice(j, 1, {
                      year: currentYear,
                      count: yearCount,
                      months: month ? [...statistic.tasks[i].years[j].months, month] : months,
                    });

                    break;
                  }
                  if (j === statistic.tasks[i].years.length - 1) {
                    let countAndroidScope = 0;
                    let countIOSScope = 0;

                    if (device === 'android') {
                      countAndroidScope = 1;
                    } else {
                      countIOSScope = 1;
                    }

                    year = {
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
                    };
                  }
                }
              } else {
                let countAndroidScope = 0;
                let countIOSScope = 0;

                if (device === 'android') {
                  countAndroidScope = 1;
                } else {
                  countIOSScope = 1;
                }

                year = {
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
                };
              }

              tasks = [...statistic.tasks];
              tasks.splice(i, 1, {
                title,
                count: tasksCount,
                years: year ? [...statistic.tasks[i].years, year] : years,
              });

              break;
            }
            if (i === statistic.tasks.length - 1) {
              let countAndroidScope = 0;
              let countIOSScope = 0;

              if (device === 'android') {
                countAndroidScope = 1;
              } else {
                countIOSScope = 1;
              }

              task = {
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
              };
            }
          }
        } else {
          let countAndroidScope = 0;
          let countIOSScope = 0;

          if (device === 'android') {
            countAndroidScope = 1;
          } else {
            countIOSScope = 1;
          }

          task = {
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
          };
        }
      }

      updateStatistics = await Statistic.findByIdAndUpdate(
        statistic._id,
        {
          meditations: meditation ? [...statistic.meditations, meditation] : meditations,
          tasks: task ? [...statistic.tasks, task] : tasks,
          count: allCount,
        },
        { new: true, runValidators: true }
      );
    } else {
      if (url.includes('meditations')) {
        const { title } = await Meditation.findOne({ _id: id });
        let androidCount = 0;
        let IOSCount = 0;

        if (device === 'android') {
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

      if (url.includes('tasks')) {
        const { title } = await Task.findOne({ _id: id });
        let androidCount = 0;
        let IOSCount = 0;

        if (device === 'android') {
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

    // if (url.includes('tasks')) {
    //   const { title } = await Task.findOne({ _id: id });

    //   await Statistic.create({
    //     title,
    //     kind: 'task',
    //     created: new Date(),
    //     device: headers['user-agent'].match(/(?<=\().*?(?=;)/)[0].split(' ')[0],
    //   });

    //   Socket.emit('statistics', {
    //     title,
    //     kind: 'task',
    //     created: new Date(),
    //     device: headers['user-agent'].match(/(?<=\().*?(?=;)/)[0].split(' ')[0],
    //   });
    // }
  } catch (err) {
    console.log(err);
  }

  next();
};
