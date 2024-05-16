import React from "react";
import { ActivityIndicator, Image, View } from "react-native";

export default function Page() {
  return (
    <View className="h-screen w-screen flex flex-col items-center justify-evenly bg-slate-800 text-gray-200 gap-5">
      <View className="h-4/5 w-full">
        <Image
          source={require("../../public/logo.png")}
          className=" -mb-32 p-0"
          style={{ height: 400, width: 400 }}
        />
        <ActivityIndicator size={80} color="white" className="-mt-12" />
      </View>
    </View>
  );
}
