import { ScrollView, View } from "react-native";
import React from "react";
import MonthYearView from "./_components/MonthYearViewHeader";
import CashFlowHeader from "./_components/CashFlowHeader";
import ExpensesCard from "./_components/ExpensesCard";

import {
  expenseChoices,
  expenseIcons,
  categoryChoices,
} from "@/constants/constants";

export default function Analytics() {
  return (
    <View className="h-screen w-screen bg-slate-800 space-y-2">
      <MonthYearView />
      <View className="h-[15%] flex flex-row w-full bg-slate-900 p-3">
        {categoryChoices.map((category, index) => (
          <CashFlowHeader key={index} category={category} amount="100.00" />
        ))}
        <CashFlowHeader category="Total" amount="100.00" />
      </View>
      <ScrollView className="'w-full max-h-[60%] pt-5">
        {expenseChoices.map((choice, index) => (
          <ExpensesCard key={index} icon={expenseIcons[index]} label={choice} percent={82}/>
        ))}
        <View className="h-12"></View>
      </ScrollView>
    </View>
  );
}