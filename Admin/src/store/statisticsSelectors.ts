// import { createSelector } from "@reduxjs/toolkit";
// import { mindfulnessApi } from "../services/api";
// import { DataStatistics } from "../types/get-results";

// const testfo: DataStatistics = mindfulnessApi.endpoints.getStatistics.select();

// const getStatisticsData = (state: any) => {
//   return testfo;
// };

// const test = createSelector([testfo], () => {
//   return "test";
// });

// export { test };

for (let i; i < statistic.meditations.length; i += 1) {
  if (statistic.meditations[i].title === title) {
    meditationsCount = statistic.meditations[i].count + 1;

    for (let j = 0; j < statistic.meditations[i].years.length; j += 1) {
      if (statistic.meditations[i].years[j].year === new Date().getFullYear()) {
        const yearCount = statistic.meditations[i].years[j].count + 1;

        for (
          let k = 0;
          k < statistic.meditations[i].years[j].months.length - 1;
          k += 1
        ) {
          if (
            statistic.meditations[i].years[j].months[k].month ===
            new Date().getMonth()
          ) {
            const monthCount =
              statistic.meditations[i].years[j].months[k].count + 1;

            if (device === "android") {
              const countAndroid =
                statistic.meditations[i].years[j].months[k].android + 1;
            } else {
              const countIOS =
                statistic.meditations[i].years[j].months[k].ios + 1;
            }
          }
        }
      }
    }
  }
}
