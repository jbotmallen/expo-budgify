import { StyleSheet, Text, View } from "react-native";
import { expenseChoices, expenseIcons } from "@/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ExpensesCard = ({ icon, label }) => {
  return (
    <View style={styles.card}>
      <Ionicons
        name={icon}
        size={50}
        color="#f3f3f3"
        className="w-1/8 me-4 text-slate-400"
      />
      <View className="flex-row justify-between items-center">
        <View className="flex flex-col w-3/5 ">
          <Text style={styles.label}>{label}</Text>
          <View className="flex flex-row gap-2 items-center">
            {/* PERCENTEGE INDICATOR */}
            <View className="bg-white border-white h-1 w-4/5"></View>
            <Text className="text-white">82.3%</Text>
          </View>
        </View>

        <View>
          <Text className="text-white text-2xl ">P100</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 15,
    height: "15%",
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "#718096",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: "white",
  },
});
export default ExpensesCard;
