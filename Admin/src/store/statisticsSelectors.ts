import { createSelector } from "@reduxjs/toolkit";
import { mindfulnessApi } from "../services/api";
import { RootState } from "../hooks/useAppSelector";
import { FILTER_MONTHS, Slice } from "../const";
import { DataStatistics, TaskAndMeditationStatistics } from "../types/server";

const getStatistics = (state: RootState) =>
  mindfulnessApi.endpoints.getStatistics.select()(state).data;
const getYear = (state: Pick<RootState, Slice.Statistics>) =>
  state[Slice.Statistics].year;
const getType = (state: Pick<RootState, Slice.Statistics>) =>
  state[Slice.Statistics].type;
const getTitle = (state: Pick<RootState, Slice.Statistics>) =>
  state[Slice.Statistics].title;
const getMonth = (state: Pick<RootState, Slice.Statistics>) =>
  state[Slice.Statistics].month;

const getFilteredStatistics = createSelector(
  [getYear, getType, getTitle, getMonth, getStatistics],
  (year, type, title, monthFilter, statistics) => {
    if (statistics) {
      const statisticsCopy = JSON.parse(
        JSON.stringify(statistics)
      ) as DataStatistics;
      let allCount = statisticsCopy.count;
      const months = Array.from(Array(12)).fill(0);
      const monthsAndroid = Array.from(Array(12)).fill(0);
      const monthsIOS = Array.from(Array(12)).fill(0);
      let currentIndexMonth = null;

      if (type === "meditations") {
        allCount = statisticsCopy.meditations.reduce((acc, meditation) => {
          return acc + meditation.count;
        }, 0);
        statisticsCopy.tasks = [];
      } else if (type === "tasks") {
        allCount = statisticsCopy.tasks.reduce((acc, task) => {
          return acc + task.count;
        }, 0);
        statisticsCopy.meditations = [];
      }
      if (title) {
        statisticsCopy.meditations = statisticsCopy.meditations.filter(
          (meditation) => meditation.title === title
        );
        statisticsCopy.tasks = statisticsCopy.tasks.filter(
          (task) => task.title === title
        );
      }
      if (year) {
        const filterByYearsAndMonths = (
          statisticsCopyItem: TaskAndMeditationStatistics[]
        ) => {
          return statisticsCopyItem
            ?.filter((item) => {
              item.years = item.years.filter((yearItem) => {
                if (yearItem.year === year) {
                  yearItem.months = yearItem.months?.filter((month) => {
                    if (monthFilter === "Все") {
                      months[month.month] += month.count;
                      monthsAndroid[month.month] += month.android;
                      monthsIOS[month.month] += month.ios;

                      return true;
                    } else if (monthFilter === FILTER_MONTHS[month.month]) {
                      item.count = month.count;
                      yearItem.count = month.count;
                      months[month.month] += month.count;
                      monthsAndroid[month.month] += month.android;
                      monthsIOS[month.month] += month.ios;
                      currentIndexMonth = month.month;

                      return true;
                    }

                    return false;
                  });
                  if (yearItem.months?.length === 0) {
                    return false;
                  }
                  item.count = yearItem.count;
                }
                return yearItem.year === year;
              });
              if (item.years.length === 0) {
                return false;
              }
              return item;
            })
            .sort((a, b) => {
              return b.count - a.count;
            });
        };
        const filteredMeditations = filterByYearsAndMonths(
          statisticsCopy.meditations
        );
        const filteredTasks = filterByYearsAndMonths(statisticsCopy.tasks);
        const allCountMeditation = filteredMeditations.reduce(
          (acc, meditation) => acc + meditation.count,
          0
        );
        const allCountTask = filteredTasks.reduce(
          (acc, task) => acc + task.count,
          0
        );

        allCount = allCountMeditation + allCountTask;
        statisticsCopy.meditations = filteredMeditations;
        statisticsCopy.tasks = filteredTasks;
      }

      statisticsCopy.count = allCount;

      return {
        statisticsCopy,
        months,
        monthsAndroid,
        monthsIOS,
        currentIndexMonth,
      };
    }
  }
);

export { getFilteredStatistics };
