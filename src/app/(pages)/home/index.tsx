import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/utils/context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import Card from "./_components/Card";
import { Link } from "expo-router";
import { useBudget } from "@/utils/context/BudgetContext";

export default function Home() {
  const { user } = useAuth();
  const { getBudget } = useBudget();
  const [budget, setBudget] = useState([]);

  useEffect(() => {
    const fetchBudget = async () => {
      const data = await getBudget(user.uid);
      setBudget(data);
    };
    fetchBudget();
  }, [budget]);

  const currentMonth = new Date().toLocaleString("default", { month: "long" }); // Get current month name (e.g., "April")
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const expenses = budget.filter(
    (item) =>
      item.category === "Expense" &&
      formatDate(item.date).includes(currentMonth)
  );

  const savings = budget.filter(
    (item) =>
      item.category === "Income" && formatDate(item.date).includes(currentMonth)
  );

  return (
    <View className="p-10 h-4/5 bg-slate-800 relative flex-1 gap-10">
      <Text className="font-bold text-slate-400 text-4xl tracking-widest text-left flex">
        Hello,
        <Text className="text-slate-300"> {user?.email.split("@")[0]}!</Text>
      </Text>
      <View className="max-h-3/4 w-full flex flex-col gap-8 border-4 border-slate-400 p-5 rounded-3xl">
        <Card title="EXPENSES" data={expenses} />
        <Card title="SAVINGS" data={savings} />
      </View>
      <Link href="/home/new" className="absolute bottom-10 right-8">
        <AntDesign name="pluscircle" size={60} color="slategray" />
      </Link>
    </View>
  );
}
