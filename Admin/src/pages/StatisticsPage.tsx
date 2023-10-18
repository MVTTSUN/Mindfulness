import styled from "styled-components";
import { useGetStatisticsQuery } from "../services/api";
import ReactECharts from "echarts-for-react";
import { Color } from "../const";
import { ContainerOneSide } from "../components/ContainerOneSide";
import { Helmet } from "react-helmet-async";
import { Subtitle } from "../components/Subtitle";
import { FontSizeSubtitle } from "../mixins";

export function StatisticsPage() {
  const { data } = useGetStatisticsQuery();

  // const test =
  //   data &&
  //   data?.map((item) => {
  //     console.log(new Date(item.created).getFullYear());
  //   });

  const optionLine = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Все платформы", "Android", "IOS"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
    },
    yAxis: {
      type: "value",
    },
    color: [Color.Errors, Color.Meditation, Color.Task],
    series: [
      {
        name: "Все платформы",
        type: "line",
        data: [120, 132, 101, 134, 90, 230, 210, 134, 90, 230, 210, 101],
        lineStyle: {
          width: 3,
        },
        symbolSize: 10,
      },
      {
        name: "Android",
        type: "line",
        data: [220, 182, 191, 234, 290, 330, 310, 134, 90, 230, 210, 101],
        lineStyle: {
          width: 3,
        },
        symbolSize: 10,
      },
      {
        name: "IOS",
        type: "line",
        data: [150, 232, 201, 154, 190, 330, 410, 134, 90, 230, 210, 101],
        lineStyle: {
          width: 3,
        },
        symbolSize: 10,
      },
    ],
  };

  const optionDonut = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0%",
      left: "center",
    },
    color: [Color.Meditation, Color.Task],
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["30%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: Color.Dark,
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
          { value: 1048, name: "Android" },
          { value: 735, name: "IOS" },
        ],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Статистика</title>
      </Helmet>
      <Subtitle>Статистика</Subtitle>
      <ContainerOneSide>
        <Text>Всего посещений: {data && data.length}</Text>
        <ReactEChartsStyled option={optionLine} />
        <ReactEChartsStyled option={optionDonut} />
      </ContainerOneSide>
    </>
  );
}

const ReactEChartsStyled = styled(ReactECharts)`
  box-sizing: border-box;
  padding: 20px;
  width: 500px;
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
`;

const Text = styled.p`
  ${FontSizeSubtitle}
`;
