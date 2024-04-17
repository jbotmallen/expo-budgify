import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ExpensesCard = ({ icon, label, percent }) => {
  let percentage = percent - 5;

  return (
    <View className="flex flex-row justify-between items-center m-3 p-4 h-32 border-4 border-slate-300 rounded-2xl gap-3">
      <Ionicons
        name={icon}
        size={50}
        color="#f3f3f3"
        className="w-[10%]"
      />
      <View className="w-[90%] flex-row justify-between items-center">
        <View className="flex flex-col h-full w-5/6">
          <Text className="text-gray-100 text-2xl">{label}</Text>
          <View className="h-1/2 w-full flex flex-row gap-2 justify-start items-center">
            {/* PERCENTEGE INDICATOR */}
            <View className={`bg-slate-300 border-white w-[82%] rounded-full h-6 relative`}>
              <Text className="text-gray-800 text-center text-xl font-bold">82.3%</Text>
            </View>
              <View className={`bg-gray-500 border-white w-[95%] rounded-full h-8 absolute -z-10`}></View>
          </View>
        </View>
        <View className="w-1/6">
          <Text className="text-green-400 text-2xl font-semibold">P 100</Text>
        </View>
      </View>
    </View>
  );
};

export default ExpensesCard;
