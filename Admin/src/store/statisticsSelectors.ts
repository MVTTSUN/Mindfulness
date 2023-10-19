import { createSelector } from "@reduxjs/toolkit";
import { mindfulnessApi } from "../services/api";
import { RootState } from "../hooks/useAppSelector";
import { Slice } from "../const";
import { DataStatistics } from "../types/get-results";

const getStatistics = (state: RootState) =>
  mindfulnessApi.endpoints.getStatistics.select()(state).data;
const getYear = (state: Pick<RootState, Slice.Statistics>) =>
  state[Slice.Statistics].year;
const getType = (state: Pick<RootState, Slice.Statistics>) =>
  state[Slice.Statistics].type;
const getTitle = (state: Pick<RootState, Slice.Statistics>) =>
  state[Slice.Statistics].title;

const getFilteredStatistics = createSelector(
  [getYear, getType, getTitle, getStatistics],
  (year, type, title, statistics) => {
    if (statistics) {
      const statisticsCopy = JSON.parse(
        JSON.stringify(statistics)
      ) as DataStatistics;
      let allCount = statisticsCopy.count;
      const months = Array.from(Array(12)).fill(0);
      const monthsAndroid = Array.from(Array(12)).fill(0);
      const monthsIOS = Array.from(Array(12)).fill(0);

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
        const filteredMeditations = statisticsCopy.meditations
          ?.filter((meditation) => {
            meditation.years = meditation.years.filter((yearMeditation) => {
              if (yearMeditation.year === year) {
                yearMeditation.months?.map((month) => {
                  months[month.month] += month.count;
                  monthsAndroid[month.month] += month.android;
                  monthsIOS[month.month] += month.ios;
                });
              }
              return yearMeditation.year === year;
            });
            if (meditation.years.length === 0) {
              return false;
            }
            return meditation;
          })
          .sort((a, b) => {
            return b.count - a.count;
          });
        const filteredTasks = statisticsCopy.tasks
          ?.filter((task) => {
            task.years = task.years.filter((yearTask) => {
              if (yearTask.year === year) {
                yearTask.months?.map((month) => {
                  months[month.month] += month.count;
                  monthsAndroid[month.month] += month.android;
                  monthsIOS[month.month] += month.ios;
                });
              }
              return yearTask.year === year;
            });
            if (task.years.length === 0) {
              return false;
            }
            return task;
          })
          .sort((a, b) => {
            return b.count - a.count;
          });
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
      };
    }
  }
);

export { getFilteredStatistics };
