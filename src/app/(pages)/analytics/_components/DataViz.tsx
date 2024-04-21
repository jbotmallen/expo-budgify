import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { bgColors } from "@/constants/constants";

const DataViz = ({ data }) => {
  // Pre-process data to include custom colors for each segment
  const chartData = data.map((item, index) => ({
    ...item,
    color: bgColors[index],
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
    <View className="w-[95%] rounded-lg flex items-center justify-center bg-slate-300 p-3 mx-auto">
      <PieChart
        data={chartData}
        width={350}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
};

export default DataViz;
