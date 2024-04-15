import { ScrollView, View, Text, StyleSheet } from "react-native";
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
    <View className="h-full w-full bg-slate-800">
      <MonthYearView />
      <View style={styles.cashFlowHeadersContainer}>
        {categoryChoices.map((category, index) => (
          <CashFlowHeader key={index} category={category} amount="100.00" />
        ))}
        <CashFlowHeader category="Total" amount="100.00" />
      </View>
      <ScrollView>
        {expenseChoices.map((choice, index) => (
          <ExpensesCard key={index} icon={expenseIcons[index]} label={choice} />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A202C",
  },
  cashFlowHeadersContainer: {
    flexDirection: "row",
    backgroundColor: "#1A202C",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2D3748",
  },
  expensesScrollView: {
    flex: 1,
    backgroundColor: "#1A202C",
  },
});
