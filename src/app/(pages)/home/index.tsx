import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/utils/context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import Card from "./_components/Card";
import { Link } from "expo-router";
import { useBudget } from "@/utils/context/BudgetContext";
import { currentMonth, formatDate } from "@/constants/functions";

export default function Home() {
  const { user } = useAuth();
  const { getBudget } = useBudget();
  const [budget, setBudget] = useState([]);
  const { loading } = useBudget();

  useEffect(() => {
    const fetchBudget = async () => {
      const data = await getBudget(user.uid);
      setBudget(data);
    };
    fetchBudget();

    return () => { };
  }, []);

  const data = useMemo(() => {
    return {
      expenses: budget.filter(
        (item) =>
          item.category === "Expense" &&
          formatDate(item.date).includes(currentMonth)
      ),
      savings: budget.filter(
        (item) =>
          item.category === "Income" &&
          formatDate(item.date).includes(currentMonth)
      ),
      transfers: budget.filter(
        (item) =>
          item.category === "Transfer" &&
          formatDate(item.date).includes(currentMonth)
      ),
    };
  }, [budget]);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-gray-800">
        <ActivityIndicator size={100} color="slategray" />
      </View>
    );


  return (
    <View className="py-16 px-5 h-4/5 bg-slate-800 relative flex-1 gap-7">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="slategray" />
        </View>
      ) : data.expenses.length === 0 && data.savings.length === 0 ? (
        <Text className="text-slate-400 text-2xl text-center">
          No data available
        </Text>
      ) : (
        <>
          <Text className="font-bold text-slate-400 text-4xl tracking-widest text-left flex">
            Hello,
            <Text className="text-slate-300">
              {" "}
              {user?.email.split("@")[0]}!
            </Text>
          </Text>
          <View className="max-h-3/4 w-full flex flex-col gap-5 border-slate-400 border-4 p-5 rounded-xl">
            <Card title="EXPENSES" data={data.expenses} />
            <Card title="SAVINGS" data={data.savings} />
            <Card title="TRANSFERS" data={data.transfers} />
          </View>
          <Link href="/home/new" className="absolute bottom-10 right-8">
            <AntDesign name="pluscircle" size={60} color="slategray" />
          </Link>
        </>
      )}
    </View>
  );
}
