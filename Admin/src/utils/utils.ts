import { Color, FILTER_MONTHS } from "../const";

const getYears = () => {
  const years = [];

  for (let i = 2023; i <= 2024; i++) {
    years.push(i);
  }

  return years;
};

const getOptionLine = (
  months?: number[],
  monthsAndroid?: number[],
  monthsIOS?: number[]
) => {
  return {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Все платформы", "Android", "IOS"],
      top: "0%",
      left: "0%",
      width: 150,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        magicType: {
          type: ["line", "bar"],
          title: {
            line: "",
            bar: "",
          },
        },
        saveAsImage: {
          title: "",
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: FILTER_MONTHS,
    },
    yAxis: {
      type: "value",
    },
    color: [Color.Errors, Color.Task, Color.Meditation],
    series: [
      {
        name: "Все платформы",
        type: "line",
        data: months,
        lineStyle: {
          width: 3,
        },
        symbolSize: 10,
      },
      {
        name: "Android",
        type: "line",
        data: monthsAndroid,
        lineStyle: {
          width: 3,
        },
        symbolSize: 10,
      },
      {
        name: "IOS",
        type: "line",
        data: monthsIOS,
        lineStyle: {
          width: 3,
        },
        symbolSize: 10,
      },
    ],
  };
};

const getOptionDonut = (monthsAndroid?: number[], monthsIOS?: number[]) => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0%",
      left: "0%",
      width: 30,
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: "",
        },
      },
    },
    color: [Color.Task, Color.Meditation],
    series: [
      {
        type: "pie",
        radius: ["40%", "90%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: Color.BackgroundMain,
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: monthsAndroid?.reduce((acc, item) => acc + item, 0),
            name: "Android",
          },
          {
            value: monthsIOS?.reduce((acc, item) => acc + item, 0),
            name: "IOS",
          },
        ],
      },
    ],
  };
};

export { getYears, getOptionLine, getOptionDonut };
