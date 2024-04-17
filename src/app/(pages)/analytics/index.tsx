import { ScrollView, View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import MonthYearView from "./_components/MonthYearViewHeader";
import CashFlowHeader from "./_components/CashFlowHeader";
import ExpensesCard from "./_components/ExpensesCard";
import DataViz from "./_components/DataViz";
import { useAuth } from "@/utils/context/AuthContext";
import { useBudget } from "@/utils/context/BudgetContext";

export default function Analytics() {
  const { user } = useAuth();
  const { getBudget } = useBudget();
  const [sumPerCategory, setSumPerCategory] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [budget, setBudget] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    const fetchBudget = async () => {
      const data = await getBudget(user.uid);
      setBudget(data);
      const current_month = new Date().toLocaleString("default", {
        month: "long",
      });
      setCurrentMonth(current_month);
    };
    fetchBudget();
  }, []);

  useEffect(() => {
    const expenses_list = budget.filter(
      (item) =>
        item.category === "Expense" &&
        formatDate(item.date).includes(currentMonth)
    );
    const unique_categories = [
      ...new Set(expenses_list.map((item) => item.expenses)),
    ];
    setUniqueCategories(unique_categories);

    const categoryTotals = calculateCategoryTotals(
      expenses_list,
      uniqueCategories
    );
    setSumPerCategory(categoryTotals);
  }, [budget, currentMonth]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const expenses_list = budget.filter(
    (item) =>
      item.category === "Expense" &&
      formatDate(item.date).includes(currentMonth)
  );
  const savings_list = budget.filter(
    (item) =>
      item.category == "Income" && formatDate(item.date).includes(currentMonth)
  );

  const savings_total = savings_list?.reduce(
    (acc, curr) => Number(acc) + Number(curr.value),
    0
  );
  const expenses_total = expenses_list?.reduce(
    (acc, curr) => Number(acc) + Number(curr.value),
    0
  );

  const total_cash_flow = savings_total - expenses_total;

  const calculateCategoryTotals = (expenses_list, categories) => {
    const categoryTotals = categories.map((category) => {
      const total = expenses_list
        .filter((item) => item.expenses === category)
        .reduce((acc, curr) => acc + parseFloat(curr.value), 0);
      const percentage =
        expenses_total !== 0 ? (total / expenses_total) * 100 : 0;

      return { name: category, amount: total, percentage: percentage };
    });
    return categoryTotals;
  };
  return (
    <View className="h-full w-full bg-slate-800">
      <MonthYearView />
      <View style={styles.cashFlowHeadersContainer}>
        <CashFlowHeader category="Expenses" data={expenses_total} />
        <CashFlowHeader category="Income" data={savings_total} />
        <CashFlowHeader category="Total Cash Flow" data={total_cash_flow} />
      </View>

      <DataViz data={sumPerCategory} />
      <Text className="text-white text-2xl mt-5 font-medium self-center">
        BREAKDOWN
      </Text>
      <ScrollView className="flex-grow-1" style={{ margin: 15 }}>
        {sumPerCategory.map((choice, index) => (
          <ExpensesCard key={index} data={choice} />
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
  dropdownButton: {
    backgroundColor: "#718096",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    width: "70%",
    marginTop: 10,
  },
  dropdownButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
});
