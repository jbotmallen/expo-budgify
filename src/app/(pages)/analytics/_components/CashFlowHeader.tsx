import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function CashFlowHeader({ category, amount }) {
  const secondTextStyle =
    category === "Expense" ? styles.textRed : styles.textGreen;

  return (
    <Pressable style={styles.container}>
      <Text style={styles.text} className="text-slate-400 text-2xl">
        {category}
      </Text>
      <Text style={secondTextStyle} className="text-3xl">{amount}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 10,
  },
  text: {
    fontWeight: "900",
  },
  textRed: {
    color: "red",
  },
  textGreen: {
    color: "green",
  },
});
