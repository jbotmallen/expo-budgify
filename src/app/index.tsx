import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1 justify-center items-center bg-slate-800 text-gray-200">
      <ActivityIndicator size={96} color='white' />
    </View>
  );
}