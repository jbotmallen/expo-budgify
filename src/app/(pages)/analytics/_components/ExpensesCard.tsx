import { StyleSheet, Text, View, Dimensions } from "react-native";
import { choiceIconPair } from "@/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ExpensesCard = ({ data, colorIndex }) => {
  const iconPair = choiceIconPair.find((pair) => pair.category === data.name);
  const iconName = iconPair ? iconPair.icon : "add-circle";

  const remainingPercentage = 100 - data.percentage;

  return (
    <View style={styles.card}>
      <Ionicons
        name={
          iconName as
            | "fast-food"
            | "car"
            | "medkit"
            | "tennisball"
            | "school"
            | "add-circle"
        }
        size={40}
        color="#f3f3f3"
        className="text-slate-400 w-fit mr-2 p-2 "
      />
      <View className="flex-row justify-between items-center w-5/6 ">
        <View className="flex flex-col w-2/3 gap-1 ">
          <View className="h-1/2 flex flex-row gap-1 items-center justify-between">
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

        <View>
          <Text className="text-blue-200 text-xl">
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
    // width: "100%",
    justifyContent: "center", // Align items vertically at the center

    padding: 10,
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
    fontSize: 20,
    color: "white",
  },
});
export default ExpensesCard;
