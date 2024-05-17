import { View, Text } from "react-native";
import React from "react";
import { currentMonth } from "@/constants/functions";

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
      <View className="w-full h-28 bg-[#7590d8] rounded-xl py-8 px-5 flex flex-row items-center justify-start">
        {value > 0 ? (
          <Text className="text-5xl tracking-widest font-normal">
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
    </View>
  );
}
