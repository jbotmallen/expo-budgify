import { Stack } from "expo-router";
import Navbar from "./_components/Navbar";
import Header from "./_components/Header";
import { View } from "react-native";

export default function Layout() {
  return (
    <View className="w-screen h-screen bg-slate-800">
      <Header />
      <Stack screenOptions={{headerShown: false}}/>
      <Navbar />
    </View>
  );
}