import { View, Text, ActivityIndicator } from "react-native";
import React, { useMemo, useState } from "react";
import { useAuth } from "@/utils/context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import Card from "./_components/Card";
import { Link } from "expo-router";
import { useBudget } from "@/utils/context/BudgetContext";
import { currentMonth, formatDate } from "@/constants/functions";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const { user } = useAuth();
  const { getBudget } = useBudget();
  const [budget, setBudget] = useState([]);

  const { loading } = useBudget();

  useFocusEffect(
    React.useCallback(() => {
      if (user?.uid) {
        const fetchBudget = async () => {
          const data = await getBudget(user.uid);
          setBudget(data);
        };
        fetchBudget();
      }
    }, [user?.uid])
  );
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
    <View className="py-14 px-10 h-4/5 bg-[#051728] relative flex-1 gap-12">
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
          <View className="flex flex-row align-middle items-center gap-2">
            {/* <AntDesign name="user" size={60} color="#A0AEC0" /> */}

            <Text className="text-4xl text-[#7590d8] tracking-widest text-left">
              Hello,{" "}
              <Text className="text-slate-200 font-black">
                {user?.email.split("@")[0]}
              </Text>{" "}
              !
            </Text>
          </View>
          <View className="max-h-3/4 w-full flex flex-col gap-5 rounded-xl">
            <Card title="EXPENSES" data={data.expenses} />
            <Card title="SAVINGS" data={data.savings} />
          </View>
        </>
      )}
      <Link href="/home/new" className="absolute bottom-10 right-8">
        <AntDesign name="pluscircle" size={60} color="#E2E8F0" />
      </Link>
    </View>
  );
}
