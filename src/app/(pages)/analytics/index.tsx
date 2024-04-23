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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [cashFlowCategory, setCashFlowCategory] = useState("Expense");
  const [activeCashFlowCategory, setActiveCashFlowCategory] =
    useState("Expense");

  // will get initial data
  useEffect(() => {
    const fetchBudget = async () => {
      const data = await getBudget(user.uid);
      setBudget(data);
    };
    fetchBudget();
  }, [cashFlowCategory]);

  useEffect(() => {
    const expenses_list = budget.filter(
      (item) =>
        item.category === cashFlowCategory &&
        formatDate(item.date).includes(getMonthName(selectedMonth)) &&
        new Date(item.date.seconds * 1000).getFullYear() === selectedYear
    );

    const unique_categories = [
      ...new Set(expenses_list.map((item) => item.expenses)),
    ];
    setUniqueCategories(unique_categories);

    const categoryTotals = calculateCategoryTotals(
      expenses_list,
      uniqueCategories,
      cashFlowCategory
    );
    setSumPerCategory(categoryTotals);
    console.log("Sum per category" + sumPerCategory);
  }, [budget, selectedMonth, selectedYear, cashFlowCategory]);

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
      formatDate(item.date).includes(getMonthName(selectedMonth)) &&
      new Date(item.date.seconds * 1000).getFullYear() === selectedYear
  );
  const savings_list = budget.filter(
    (item) =>
      item.category == "Income" &&
      formatDate(item.date).includes(getMonthName(selectedMonth)) &&
      new Date(item.date.seconds * 1000).getFullYear() === selectedYear
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
  const handleMonthYearChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    console.log("data for " + getMonthName(month) + year);
  };
  const calculateCategoryTotals = (
    expenses_list,
    categories,
    cash_flow_category
  ) => {
    const total =
      cash_flow_category === "Income" ? savings_total : expenses_total;

    const categoryTotals = categories.map((category) => {
      const total_per_category = expenses_list
        .filter((item) => item.expenses === category)
        .reduce((acc, curr) => acc + parseFloat(curr.value), 0);
      const percentage = total !== 0 ? (total_per_category / total) * 100 : 0;

      return {
        name: category,
        amount: total_per_category,
        percentage: percentage,
      };
    });
    return categoryTotals;
  };

  return (
    <View style={styles.container}>
      <MonthYearView onMonthYearChange={handleMonthYearChange} />
      <View style={styles.cashFlowHeadersContainer}>
        <CashFlowHeader
          category="Expenses"
          data={expenses_total}
          onPress={() => {
            setCashFlowCategory("Expense");
            setActiveCashFlowCategory("Expense");
          }}
          isActive={activeCashFlowCategory === "Expense"}
        />
        <CashFlowHeader
          category="Income"
          data={savings_total}
          onPress={() => {
            setCashFlowCategory("Income");
            setActiveCashFlowCategory("Income");
          }}
          isActive={activeCashFlowCategory === "Income"}
        />
        <CashFlowHeader
          category="Cash Flow"
          data={total_cash_flow}
          onPress={() => {
            setCashFlowCategory("Expense");
            setActiveCashFlowCategory("Cash Flow");
          }}
          isActive={activeCashFlowCategory === "Cash Flow"}
        />
      </View>
      {sumPerCategory.length === 0 ? (
        <Text style={styles.noRecordsText}>No records yet!</Text>
      ) : (
        <>
          <DataViz data={sumPerCategory} />
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {sumPerCategory.map((choice, index) => (
              <ExpensesCard key={index} data={choice} colorIndex={index} />
            ))}
          </ScrollView>
        </>
      )}
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
    height: "20%",
    width: "100%",
    backgroundColor: "#1A202C",
    padding: 10,
    gap: 5,
  },
  breakdownTitle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    marginHorizontal: 15,
  },
  noRecordsText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
const getMonthName = (monthIndex) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};
