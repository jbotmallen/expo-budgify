import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

export default function CashFlowHeader({ category, data }) {
  const secondTextStyle =
    category === "Expenses" ? styles.textRed : styles.textGreen;

  return (
    <Pressable style={styles.container}>
      <Text style={styles.text} className="text-slate-400 text-xl">
        {category}
      </Text>
      <Text style={secondTextStyle}> ₱ {data.toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    height: "100%",
    width: "33%",
    padding: 10,
    backgroundColor: "#0008",
    borderRadius: 10,
  },
  text: {
    fontWeight: "900",
    fontSize: 24,
  },
  textRed: {
    color: "red",
    fontSize: 24,
  },
  textGreen: {
    color: "green",
    fontSize: 24,
  },
});
