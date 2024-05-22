import { StyleSheet, Text, View, Dimensions } from "react-native";
import { incomeIconPair, expenseIconPair, categoryIconPair } from "@/constants/constants";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ExpensesCard = ({ data, category }) => {
  let iconPair = null;

  if (category.toLowerCase() === "expense") {
    iconPair = expenseIconPair.find((pair) => pair.category === data.name);
  } else if (category.toLowerCase() === "income") {
    iconPair = incomeIconPair.find((pair) => pair.category === data.name);
  } else {
    iconPair = categoryIconPair.find((pair) => pair.category === data.name);
  }

  const iconName = iconPair ? iconPair.icon : "add-circle";

  const remainingPercentage = 100 - data.percentage;

  return (
    <View style={styles.card} className="">
      <Ionicons
        name={
          iconName as
          | "fast-food"
          | "car"
          | "medkit"
          | "tennisball"
          | "school"
          | "cash"
          | "card"
          | "add-circle"
        }
        size={40}
        color="#f3f3f3"
        className="text-slate-400 w-fit mr-5 align-middle h-full  flex items-center justify-center"
      />
      <View className="flex flex-row justify-between w-5/6 ">
        <View className="flex flex-col w-2/3 gap-3">
          <View className="h-1/2 flex flex-row justify-between ">
            <Text style={styles.label}>{data.name}</Text>
            <Text style={styles.label}>
              {" "}
              ₱{" "}
              {Number(data.amount.toFixed(2)).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={{
                ...styles.progressBar,
                width: `${data.percentage}%`,
              }}
            />
            <View
              style={{
                ...styles.progressBar,
                width: `${remainingPercentage}%`,
                backgroundColor: "gray",
              }}
            />
          </View>
        </View>

        <View className="flex items-center justify-center">
          <Text className="text-blue-200 text-lg sm:text-xl">
            {data.percentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
    paddingHorizontal: 15,
    height: windowHeight * 0.12,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "#718096",
    marginVertical: 5,
  },
  progressBarContainer: {
    flex: 1,
    height: "100%",
    display: "flex",

    flexDirection: "row",
  },
  progressBar: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 4,
  },
  label: {
    fontSize: 18,
    color: "white",
  },
});
export default ExpensesCard;
