import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const DataViz = ({ data }) => {
  const randomizeColors = () => {
    return data.map(() => {
      let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      if (/^#[0-9A-F]{6}$/i.test(color)) {
        return color;
      } else {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      }
    });
  };

  // Pre-process data to include custom colors for each segment
  const chartData = data.map((item, index) => ({
    ...item,
    color: randomizeColors()[index],
  }));

  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => "white",
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: {
      fontSize: 12,
    },
  };

  return (
    <View>
      <PieChart
        data={chartData}
        width={350}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="50"
        style={{ marginBottom: 10 }}
      />
    </View>
  );
};

export default DataViz;
