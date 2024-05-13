import React from "react";
import { ActivityIndicator, Image, View } from "react-native";

export default function Page() {
  return (
    <View className="h-screen w-screen flex flex-col items-center justify-evenly bg-slate-800 text-gray-200">
      <View className="h-4/5 w-full">
        <Image source={require('../../public/logo.png')} className=" -mb-32 p-0" style={{ height: 600, width: 600 }} />
        <ActivityIndicator size={96} color='white' className="-mt-12"/>
      </View>
    </View>
  );
}