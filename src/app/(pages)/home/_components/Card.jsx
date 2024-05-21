import { View, Text } from "react-native";
import React from "react";
import { currentMonth } from "@/constants/functions";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Card({ title, data }) {
  const value = data?.reduce(
    (acc, curr) => Number(acc) + Number(curr.value),
    0
  );

  return (
    <View className="rounded-xl flex flex-col gap-2">
      <Text className="text-slate-400 text-xl">
        {title} FOR
        <Text className="text-slate-300 font-bold">
          {" "}
          {currentMonth.toUpperCase()}
        </Text>
      </Text>
      <View
        className={`w-full ${
          title === "SAVINGS" ? "bg-[#75d8b2]" : "bg-[#d87c75]"
        } rounded-xl py-8 px-5 flex flex-row items-center justify-between`}
      >
        <View className="flex flex-row items-center justify-start">
          {value > 0 ? (
            <Text className="text-4xl tracking-wide font-normal">
              ₱{" "}
              {Number(value.toFixed(2)).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          ) : (
            <Text className="text-4xl tracking-widest font-normal">
              No {title.toLowerCase()} for {currentMonth}
            </Text>
          )}
        </View>
        {title === "SAVINGS" ? (
          <FontAwesome6 name="piggy-bank" size={40} color="black" />
        ) : (
          <MaterialIcons name="money-off" size={45} color="black" />
        )}
      </View>
    </View>
  );
}
