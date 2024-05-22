import React from "react";
import { ActivityIndicator, Image, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1 items-center justify-center bg-slate-800 text-gray-200">
        <Image
          source={require("../../public/logo.png")}
          className="w-full h-1/4"
        />
        <ActivityIndicator size={150} color="slategray" />
    </View>
  );
}
