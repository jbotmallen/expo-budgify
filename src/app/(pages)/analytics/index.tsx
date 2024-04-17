import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import MonthYearView from "./_components/MonthYearViewHeader";
import CashFlowHeader from "./_components/CashFlowHeader";
import ExpensesCard from "./_components/ExpensesCard";
import DataViz from "./_components/DataViz";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/utils/context/AuthContext";
import { useBudget } from "@/utils/context/BudgetContext";
import Card from "../home/_components/Card";

import {
  expenseChoices,
  expenseIcons,
  categoryChoices,
} from "@/constants/constants";

export default function Analytics() {
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState("");
  const { user } = useAuth();
  const { getBudget } = useBudget();
  const [budget, setBudget] = useState([]);
  const handleSelectOption = (selectedOption) => {
    setOption(selectedOption);
    setVisible(false);
  };
  useEffect(() => {
    const fetchBudget = async () => {
      const data = await getBudget(user.uid);
      if (data) {
        setBudget(data);
      }
    };

    fetchBudget();
  }, []);
  const expenses_list = budget.filter((item) => item.category == "Expense");
  const savings_list = budget.filter((item) => item.category == "Income");

  const savings_total = savings_list?.reduce(
    (acc, curr) => Number(acc) + Number(curr.value),
    0
  );
  const expenses_total = expenses_list?.reduce(
    (acc, curr) => Number(acc) + Number(curr.value),
    0
  );

  const total = savings_total - expenses_total;

  return (
    <View className="h-full w-full bg-slate-800">
      <MonthYearView />

      <View style={styles.cashFlowHeadersContainer}>
        <CashFlowHeader category="Expenses" data={expenses_total} />
        <CashFlowHeader category="Income" data={savings_total} />
        <CashFlowHeader category="Total Cash Flow" data={total} />
      </View>
      <TouchableOpacity
        className="flex flex-row justify-between p-5"
        onPress={() => setVisible(true)}
        style={styles.dropdownButton}
      >
        <Text style={styles.dropdownButtonText}>
          {option || "Select Option"}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {expenseChoices.map((choice, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectOption(choice)}
                style={styles.option}
              >
                <Text style={styles.optionText}>{choice}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <DataViz />

      <Text className="text-white text-2xl mt-5 font-medium self-center">
        BREAKDOWN
      </Text>
      <ScrollView className="flex-grow-1" style={{ margin: 15 }}>
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
  dropdownButton: {
    backgroundColor: "#718096",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    width: "70%",
    // display: "flex,"
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
