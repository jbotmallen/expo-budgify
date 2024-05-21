import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { bgColors } from "@/constants/constants";

const DataViz = ({ data }) => {
  const chartData = data.map((item, index) => ({
    ...item,
    color: bgColors[index],
    legendFontColor: "white",
    legendFontSize: 16,
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
    <View className="w-[95%] h-1/5 rounded-lg flex items-center justify-center p-3 mx-auto mb-5">
      <PieChart
        data={chartData}
        width={300}
        height={150}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
};

export default DataViz;
