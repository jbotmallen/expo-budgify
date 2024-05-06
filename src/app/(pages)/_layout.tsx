import { Stack } from "expo-router";
import Navbar from "./_components/Navbar";
import Header from "./_components/Header";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/utils/context/AuthContext";
import { BudgetProvider } from "@/utils/context/BudgetContext";

export default function Layout() {
  const { user } = useAuth();

  if (user === false) return <ActivityIndicator size={96} color="white" />;
  return (
    <BudgetProvider>
      <View className="w-screen h-screen bg-slate-800">
        <Header />
        <Stack
          screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
        />
        <Navbar />
      </View>
    </BudgetProvider>
  );
}
