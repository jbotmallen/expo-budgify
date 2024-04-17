import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useBudget } from "@/utils/context/BudgetContext";
import { useAuth } from "@/utils/context/AuthContext";

const DataViz = () => {
  const data = [
    { name: "Groceries", amount: 400, color: "#FF6384" },
    { name: "Entertainment", amount: 300, color: "#36A2EB" },
    { name: "Transportation", amount: 200, color: "#FFCE56" },
    { name: "Dining", amount: 500, color: "#4CAF50" },
    { name: "Utilities", amount: 600, color: "#9575CD" },
  ];

  return (
    <View>
      <PieChart
        data={data}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => "white",
          // labelColor: "#fff", // Change text color
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="50 "
      />
    </View>
  );
};

export default DataViz;
