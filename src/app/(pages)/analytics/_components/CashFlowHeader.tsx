import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function CashFlowHeader({ category, amount }) {
  const secondTextStyle =
    category === "Expense" ? styles.textRed : styles.textGreen;

  return (
    <Pressable style={styles.container}>
      <Text style={styles.text} className="text-slate-400">
        {category}
      </Text>
      <Text style={secondTextStyle}>{amount}</Text>
    </Pressable>
  );
}

//comment
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    height: "40%",
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
