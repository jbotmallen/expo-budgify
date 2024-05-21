import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import MonthYearView from "./_components/MonthYearViewHeader";
import CashFlowHeader from "./_components/CashFlowHeader";
import ExpensesCard from "./_components/ExpensesCard";
import DataViz from "./_components/DataViz";
import { useAuth } from "@/utils/context/AuthContext";
import { useBudget } from "@/utils/context/BudgetContext";

export default function Analytics() {
  const { user } = useAuth();
  const { getBudget, loading } = useBudget();
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [budget, setBudget] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [cashFlowCategory, setCashFlowCategory] = useState("Expense");
  const [activeCashFlowCategory, setActiveCashFlowCategory] =
    useState("Expense");

  useEffect(() => {
    const fetchBudget = async () => {
      const data = await getBudget(user.uid);
      setBudget(data);
    };
    fetchBudget();
  }, []);

  useEffect(() => {
    const expenses_list = budget.filter(
      (item) =>
        item.category === cashFlowCategory &&
        formatDate(item.date).includes(getMonthName(selectedMonth)) &&
        new Date(item.date.seconds * 1000).getFullYear() === selectedYear
    );
    setFilteredData(expenses_list);
    const unique_categories = [
      ...new Set(expenses_list.map((item) => item.expenses)),
    ];
    setUniqueCategories(unique_categories);
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
  };
  const calculateCategoryTotals = (
    budgetList,
    categories,
    cash_flow_category
  ) => {
    const total =
      cash_flow_category === "Income" ? savings_total : expenses_total;

    const categoryTotals = categories.map((category) => {
      const total_per_category = budgetList
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

  const sumCategory = useMemo(() => {
    return calculateCategoryTotals(
      filteredData,
      uniqueCategories,
      cashFlowCategory
    );
  }, [budget, uniqueCategories, cashFlowCategory]);

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
      {loading ? (
        <ActivityIndicator
          size={150}
          color="slategray"
          className="fixed top-1/4 left-0"
        />
      ) : sumCategory.length === 0 && !loading ? (
        <Text style={styles.noRecordsText}>No records yet!</Text>
      ) : (
        <>
          <DataViz data={sumCategory} />
          <ScrollView className="max-h-[60%]" contentContainerStyle={styles.scrollViewContent}>
            {sumCategory.map((choice, index) => (
              <ExpensesCard
                key={index}
                data={choice}
                category={cashFlowCategory}
              />
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
    backgroundColor: "#051728",
    position: "relative",
  },
  cashFlowHeadersContainer: {
    flexDirection: "row",
    height: "20%",
    width: "100%",
    backgroundColor: "#051728",
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
