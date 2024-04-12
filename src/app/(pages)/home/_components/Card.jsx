import { View, Text } from "react-native";
import React from "react";

export default function Card({ title, data }) {
  const value = data?.reduce((acc, curr) => Number(acc) + Number(curr.value), 0);

  return (
    <View className="rounded-xl flex flex-col gap-2">
      <Text className="text-slate-400 text-lg">{title} FOR
        <Text className="text-slate-300 font-bold"> APRIL</Text>
      </Text>
      <View className="w-full h-28 bg-violet-400 rounded-xl py-8 px-5 flex flex-row items-center justify-start">
        <Text className="text-5xl tracking-widest font-normal">₱ {value.toFixed(2)}</Text>
      </View>
    </View>
  );
}
